import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"

interface Trade {
  id: number
  pair: string
  quantity: number
  buyPrice: number
  sellPrice: number | null
  profitPercent: number | null
  status: string
  createdAt: string
}

export default function HomePage() {
  const [trades, setTrades] = useState<Trade[]>([])

  useEffect(() => {
    fetch("https://bot-kraken-production-ee86.up.railway.app/trades/all")
      .then(res => res.json())
      .then(data => setTrades(data))
      .catch(err => console.error("Error cargando trades:", err))
  }, [])

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Visor de Trades - Kraken Bot</h1>
      
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Pair</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Buy</TableHead>
                <TableHead>Sell</TableHead>
                <TableHead>Profit %</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map(trade => (
                <TableRow key={trade.id}>
                  <TableCell>{trade.id}</TableCell>
                  <TableCell>{trade.pair}</TableCell>
                  <TableCell>{trade.quantity.toFixed(4)}</TableCell>
                  <TableCell>{trade.buyPrice?.toFixed(6)}</TableCell>
                  <TableCell>{trade.sellPrice?.toFixed(6) ?? "-"}</TableCell>
                  <TableCell className={trade.profitPercent != null ? (trade.profitPercent > 0 ? "text-green-600" : "text-red-600") : ""}>
                    {trade.profitPercent != null ? `${trade.profitPercent.toFixed(2)}%` : "-"}
                  </TableCell>
                  <TableCell>{trade.status}</TableCell>
                  <TableCell>{new Date(trade.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
