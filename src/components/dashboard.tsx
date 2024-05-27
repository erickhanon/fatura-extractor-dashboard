"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [faturas, setFaturas] = useState<any[]>([]);
  const [clientNumbers, setClientNumbers] = useState<string[]>([]);
  const [clientNumber, setClientNumber] = useState("all");
  const [filteredFaturas, setFilteredFaturas] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/faturas")
      .then((response) => {
        const faturas = response.data;
        setFaturas(faturas);
        setFilteredFaturas(faturas);
        const uniqueClientNumbers: string[] = Array.from(
          new Set(faturas.map((fatura: any) => fatura.client_number))
        );
        setClientNumbers(uniqueClientNumbers);
      })
      .catch((error) => {
        console.error("There was an error fetching the faturas!", error);
      });
  }, []);

  const filterFaturas = (clientNumber: string) => {
    if (clientNumber && clientNumber !== "all") {
      setFilteredFaturas(
        faturas.filter((fatura) => fatura.client_number === clientNumber)
      );
    } else {
      setFilteredFaturas(faturas);
    }
  };

  useEffect(() => {
    filterFaturas(clientNumber);
  }, [clientNumber, faturas]);

  const calculateEnergyData = (data: any[]) => {
    return data.map((fatura) => ({
      month: fatura.reference_month,
      consumption: fatura.energia_eletrica_kwh + fatura.energia_scee_kwh,
      compensation: fatura.energia_compensada_kwh,
    }));
  };

  const calculateMonetaryData = (data: any[]) => {
    return data.map((fatura) => ({
      month: fatura.reference_month,
      totalValue:
        parseFloat(fatura.energia_eletrica_valor) +
        parseFloat(fatura.energia_scee_valor) +
        parseFloat(fatura.contrib_ilum_valor),
      savings: parseFloat(fatura.energia_compensada_valor),
    }));
  };

  const energyData = calculateEnergyData(filteredFaturas);
  const monetaryData = calculateMonetaryData(filteredFaturas);

  const energyChartData = {
    labels: energyData.map((d) => d.month),
    datasets: [
      {
        label: "Consumo de Energia Elétrica (kWh)",
        data: energyData.map((d) => d.consumption),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Energia Compensada (kWh)",
        data: energyData.map((d) => d.compensation),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  const monetaryChartData = {
    labels: monetaryData.map((d) => d.month),
    datasets: [
      {
        label: "Valor Total sem GD (R$)",
        data: monetaryData.map((d) => d.totalValue),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "Economia GD (R$)",
        data: monetaryData.map((d) => d.savings),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  return (
    <Card className="max-w-7xl mx-auto my-8 p-6">
      <CardHeader>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Select onValueChange={setClientNumber} value={clientNumber}>
          <SelectTrigger>
            <SelectValue placeholder="Select client number" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Faturas</SelectItem>
            {clientNumbers.map((number) => (
              <SelectItem key={number} value={number}>
                {number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Consumo de Energia (kWh)
          </h2>
          <Line data={energyChartData} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Valores Monetários (R$)
          </h2>
          <Line data={monetaryChartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
