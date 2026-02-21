"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CreditSelectionStep } from "@/components/organisms/CreditSelectionStep/CreditSelectionStep";
import { Button } from "@/components/atoms/Button";
import { mockCarbonProjects } from "@/lib/api/mock/carbonProjects";
import type { CreditSelectionState } from "@/lib/types/carbon";

export default function PurchasePage() {
  const router = useRouter();
  const [selection, setSelection] = useState<CreditSelectionState | null>(null);

  const handleSelectionChange = useCallback((newSelection: CreditSelectionState) => {
    setSelection(newSelection);
    console.log("Selection changed:", newSelection);
  }, []);

  const handleNext = () => {
    router.push("/credits/purchase/wallet");
  };

  const canProceed = selection?.projectId && selection.quantity > 0 && selection.calculatedPrice > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <CreditSelectionStep
        projects={mockCarbonProjects}
        onSelectionChange={handleSelectionChange}
      />
      <div className="flex justify-end pt-6">
        <Button
          stellar="primary"
          size="lg"
          onClick={handleNext}
          disabled={!canProceed}
          aria-label="Continue to wallet connection"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
