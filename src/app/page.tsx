import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://bot-kraken-production-ee86.up.railway.app/trades/summary")
      .then(res => res.json())
      .then(setSummary);

    fetch("https://bot-kraken-production-ee86.up.railway.app/trades/all")
      .then(res => res.json())
      .then(setTrades);
  }, []);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Resumen de Trades</h1>

      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card><CardContent className="p-4 text-center"><div className="text-sm text-muted">Total Trades</div><div className="text-xl font-bold">{summary.totalTrades}</div></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="text-sm text-muted">Ganancia Total (%)</div><div className="text-xl font-bold">{summary.totalProfitPercent.toFixed(2)}</div></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="text-sm text-muted">Media (%)</div><div className="text-xl font-bold">{summary.averageProfitPercent.toFixed(2)}</div></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="text-sm text-muted">Winners / Losers</div><div className="text-xl font-bold">{summary.winners} / {summary.losers}</div></CardContent></Card>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8">Historial de Trades</h2>

      <div className="overflow-auto rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Par</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Buy</TableHead>
              <TableHead>Sell</TableHead>
              <TableHead>Profit (%)</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((t, i) => (
              <TableRow key={i}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.pair}</TableCell>
                <TableCell className="capitalize text-sm text-muted-foreground">{t.status}</TableCell>
                <TableCell>{t.buyPrice?.toFixed(6) || '-'}</TableCell>
                <TableCell>{t.sellPrice?.toFixed(6) || '-'}</TableCell>
                <TableCell>{t.profitPercent !== null ? t.profitPercent.toFixed(2) : '-'}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
