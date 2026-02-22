import { useEffect, useState } from "react";
import { fetchRecentTransactions } from "../../lib/services/fetchTransactions";
import type { TransactionItem } from "../../lib/types/transaction";
import { CardContent } from "../molecules/Card";
import { Button } from "../atoms/Button";

export function TransactionHistory({ address }: { address: string }) {
  const [transactions, setTx] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const tx = await fetchRecentTransactions(address);
      setTx(tx);
    } catch (err) {
      setTx([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [address]);

  return (
    <div className="space-y-4">
        <CardContent className="flex flex-col gap-3 items-center">
      <Button onClick={load} aria-label="Refresh" stellar="primary" className={`rounded-md shadow-lg px-4 py-3 flex items-start gap-3 w-full max-w-sm transition-all duration-300`}
    >
        Refresh
      </Button>
      </CardContent>
     <CardContent className="flex flex-col gap-3 items-center" >
      {loading && <p className="rounded-md shadow-lg px-4 py-3 w-full max-w-sm transition-all duration-300 bg-stellar-blue text-white">Loading...</p>}
      </CardContent>

      {!loading && transactions.length === 0 && <p>No recent transactions.</p>}

      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="border p-4 rounded-md flex justify-between items-center"
          >
            <a
              href={`https://stellar.expert/explorer/public/tx/${tx.id}`}
              target="_blank"
              rel="noreferrer"
              className="underline break-all"
            >
              {tx.id}
            </a>

            <span
              className={`badge ${
                tx.status === "pending"
                  ? "bg-yellow-500"
                  : tx.status === "confirmed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {tx.status}
            </span>

            <span>{new Date(tx.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}