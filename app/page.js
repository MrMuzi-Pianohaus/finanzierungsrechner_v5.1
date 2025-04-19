'use client';
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Finanzierungsrechner() {
  const [preis, setPreis] = useState(27160);
  const [laufzeit, setLaufzeit] = useState(36);
  const [zins, setZins] = useState(4.9);
  const [zinsUebernahme, setZinsUebernahme] = useState(100);
  const [rate, setRate] = useState(300);
  const [ergebnis, setErgebnis] = useState(null);

  const berechne = () => {
    const r = zins / 100 / 12;
    const finanzierungsbetrag = rate * ((1 + r) ** laufzeit - 1) / (r * (1 + r) ** laufzeit);
    const anzahlung = preis - finanzierungsbetrag;
    const zinskosten = (rate * laufzeit) - finanzierungsbetrag;
    const uebernahmeBetrag = zinskosten * (zinsUebernahme / 100);

    const effektivKundenzahlung =
      anzahlung + (zinsUebernahme === 100
        ? finanzierungsbetrag
        : zinsUebernahme === 0
        ? rate * laufzeit
        : finanzierungsbetrag + (zinskosten - uebernahmeBetrag));

    setErgebnis({
      anzahlung: anzahlung.toFixed(2),
      finanzierungsbetrag: finanzierungsbetrag.toFixed(2),
      zinskosten: zinskosten.toFixed(2),
      uebernahmeBetrag: uebernahmeBetrag.toFixed(2),
      effektivKundenzahlung: effektivKundenzahlung.toFixed(2)
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-[#8b0000]">Finanzierungsrechner (nach Wunschrate)</h1>

      <label>Klavierpreis (€):</label>
      <Input type="number" value={preis} onChange={(e) => setPreis(parseFloat(e.target.value))} />

      <label>Laufzeit (Monate):</label>
      <Input type="number" value={laufzeit} onChange={(e) => setLaufzeit(parseInt(e.target.value))} />

      <label>Zinssatz der Bank (% p.a.):</label>
      <Input type="number" value={zins} onChange={(e) => setZins(parseFloat(e.target.value))} />

      <label>Wie viel % der Zinskosten übernehmen wir?</label>
      <Input type="number" value={zinsUebernahme} onChange={(e) => setZinsUebernahme(parseFloat(e.target.value))} />

      <label>Gewünschte monatliche Rate (€):</label>
      <Input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} />

      <Button onClick={berechne}>Jetzt berechnen</Button>

      {ergebnis && (
        <Card>
          <CardContent className="p-4 space-y-2 text-[#2e2e2e]">
            <p><strong>Erforderliche Anzahlung:</strong> € {ergebnis.anzahlung}</p>
            <p><strong>Finanzierungsbetrag:</strong> € {ergebnis.finanzierungsbetrag}</p>
            <p><strong>Gesamte Zinskosten:</strong> € {ergebnis.zinskosten}</p>
            <p><strong>Unser übernommener Anteil:</strong> € {ergebnis.uebernahmeBetrag}</p>
            <p><strong>Effektive Kundenzahlung:</strong> € {ergebnis.effektivKundenzahlung}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
