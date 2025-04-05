import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Dashboard() {
  const [trades, setTrades] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("https://bot-kraken-production-ee86.up.railway.app/trades/all")
      .then(res => res.json())
      .then(setTrades);

    fetch("https://bot-kraken-production-ee86.up.railway.app/trades/summary")
      .then(res => res.json())
      .then(setSummary);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Resumen de Trades</h2>
          {summary ? (
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <li><strong>Total:</strong> {summary.totalTrades}</li>
              <li><strong>Ganancia Total (%):</strong> {summary.totalProfitPercent.toFixed(2)}</li>
              <li><strong>Ganancia Media (%):</strong> {summary.averageProfitPercent.toFixed(2)}</li>
              <li><strong>Winners:</strong> {summary.winners}</li>
              <li><strong>Losers:</strong> {summary.losers}</li>
            </ul>
          ) : (
            <p>Cargando resumen...</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Historial de Trades</h2>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Par</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Compra</TableHead>
                  <TableHead>Venta</TableHead>
                  <TableHead>Ganancia (%)</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade: any) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.id}</TableCell>
                    <TableCell>{trade.pair}</TableCell>
                    <TableCell>{trade.quantity.toFixed(4)}</TableCell>
                    <TableCell>{trade.buyPrice ?? "-"}</TableCell>
                    <TableCell>{trade.sellPrice ?? "-"}</TableCell>
                    <TableCell>{trade.profitPercent !== null ? `${trade.profitPercent.toFixed(2)}%` : "-"}</TableCell>
                    <TableCell>{trade.status}</TableCell>
                    <TableCell>{new Date(trade.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
