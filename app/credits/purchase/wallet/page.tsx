"use client";

import { WalletConnectionStep } from "@/components/organisms/WalletConnectionStep/WalletConnectionStep";
import type { WalletConnection } from "@/lib/types/wallet";

export default function WalletPage() {
  const handleConnectionChange = (connection: WalletConnection | null) => {
    console.log("Wallet connection changed:", connection);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <WalletConnectionStep onConnectionChange={handleConnectionChange} />
    </div>
  );
}
