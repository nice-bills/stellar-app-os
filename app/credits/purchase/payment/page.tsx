"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaymentMintingStep } from "@/components/organisms/PaymentMintingStep/PaymentMintingStep";
import { Text } from "@/components/atoms/Text";
import { useWalletContext } from "@/contexts/WalletContext";
import type { CreditSelectionState } from "@/lib/types/carbon";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { wallet } = useWalletContext();
  const [selection, setSelection] = useState<CreditSelectionState | null>(null);

  useEffect(() => {
    const selectionParam = searchParams.get("selection");
    if (selectionParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(selectionParam)) as CreditSelectionState;
        setSelection(parsed);
      } catch (err) {
        console.error("Failed to parse selection:", err);
        router.push("/credits/purchase");
      }
    } else {
      router.push("/credits/purchase");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleComplete = (transactionHash: string) => {
    console.log("Transaction completed:", transactionHash);
  };

  const handleError = (error: string) => {
    console.error("Transaction error:", error);
  };

  if (!selection || !wallet?.isConnected) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <Text variant="h3" as="h2" className="mb-2">
            Loading...
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <PaymentMintingStep
        selection={selection}
        wallet={wallet}
        onComplete={handleComplete}
        onError={handleError}
      />
    </div>
  );
}
