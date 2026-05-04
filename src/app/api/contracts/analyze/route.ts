import { NextResponse } from "next/server";
import { zodToJsonSchema } from "zod-to-json-schema";

import { gemini, GEMINI_PRO_MODEL } from "@/lib/ai/gemini";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { ContractAnalysisSchema } from "@/lib/ai/schemas/contract";
import { buildContractPrompt } from "@/lib/ai/prompts/contract";

export async function POST(req: Request) {
  try {
    const { projectId, contractText } = await req.json();

    if (!contractText || contractText.trim().length < 50) {
      return NextResponse.json(
        { success: false, error: "Contract text is too short." },
        { status: 400 }
      );
    }

    const response = await gemini.models.generateContent({
      model: GEMINI_PRO_MODEL,
      contents: buildContractPrompt(contractText),
      config: {
        responseMimeType: "application/json",
        // @ts-ignore
        responseJsonSchema: zodToJsonSchema(ContractAnalysisSchema),
      },
    });

    const raw = response.text;
    if (!raw) throw new Error("Empty Gemini response");

    const parsed = JSON.parse(raw);
    const validated = ContractAnalysisSchema.parse(parsed);

    const { data: contractRow, error: contractError } = await supabaseAdmin
      .from("contract_analyses")
      .insert({
        project_id: projectId || "clinic-booking-platform",
        contract_text: contractText,
        output_json: validated,
        confidence_score: validated.confidenceScore,
      })
      .select()
      .single();

    if (contractError) throw contractError;

    const alertRows = [
      ...validated.risks.map((risk) => ({
        project_id: projectId || "clinic-booking-platform",
        source_type: "contract",
        source_id: contractRow.id,
        title: risk.title,
        message: risk.impact,
        severity: risk.severity,
        status: "open",
      })),
      ...validated.deadlines
        .filter((deadline) => deadline.priority === "high" || deadline.priority === "critical")
        .map((deadline) => ({
          project_id: projectId || "clinic-booking-platform",
          source_type: "contract_deadline",
          source_id: contractRow.id,
          title: deadline.title,
          message: deadline.consequenceIfMissed || "Important contract deadline.",
          severity: deadline.priority,
          status: "open",
        })),
    ];

    if (alertRows.length > 0) {
      await supabaseAdmin.from("alerts").insert(alertRows);
    }

    await supabaseAdmin.from("ai_outputs").insert({
      project_id: projectId || "clinic-booking-platform",
      type: "contract_analysis",
      json: validated,
    });

    return NextResponse.json({
      success: true,
      data: validated,
    });
  } catch (error) {
    console.error("Contract analysis failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze contract.",
      },
      { status: 500 }
    );
  }
}
