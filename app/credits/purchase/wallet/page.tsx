"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WalletConnectionStep } from "@/components/organisms/WalletConnectionStep/WalletConnectionStep";
import { Button } from "@/components/atoms/Button";
import type { WalletConnection } from "@/lib/types/wallet";

export default function WalletPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [selectionParam, setSelectionParam] = useState<string | null>(null);

  useEffect(() => {
    const param = searchParams.get("selection");
    if (param) {
      setSelectionParam(param);
    } else {
      router.push("/credits/purchase");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleConnectionChange = (connection: WalletConnection | null) => {
    setWallet(connection);
    console.log("Wallet connection changed:", connection);
  };

  const handleNext = () => {
    if (selectionParam && wallet?.isConnected) {
      router.push(`/credits/purchase/payment?selection=${selectionParam}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <WalletConnectionStep onConnectionChange={handleConnectionChange} />
      {wallet?.isConnected && (
        <div className="flex justify-end pt-6">
          <Button
            stellar="primary"
            size="lg"
            onClick={handleNext}
            aria-label="Continue to payment"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
