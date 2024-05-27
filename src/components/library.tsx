"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const Library: React.FC = () => {
    const [clientNumbers, setClientNumbers] = useState<string[]>([]);
    const [clientNumber, setClientNumber] = useState('');
    const [referenceMonth, setReferenceMonth] = useState('');
    const [availableMonths, setAvailableMonths] = useState<string[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/faturas/')
            .then(response => {
                const uniqueClientNumbers = Array.from(new Set(response.data.map((fatura: { client_number: string }) => fatura.client_number))) as string[];
                setClientNumbers(uniqueClientNumbers);
            })
            .catch(error => {
                console.error('There was an error fetching the faturas!', error);
            });
    }, []);

    useEffect(() => {
        if (clientNumber) {
            axios.get(`http://localhost:3000/faturas/${clientNumber}`)
                .then(response => {
                    const uniqueMonths = Array.from(new Set(response.data.map((fatura: { reference_month: string }) => fatura.reference_month))) as string[];
                    setAvailableMonths(uniqueMonths);
                })
                .catch(error => {
                    console.error('There was an error fetching the faturas for the client!', error);
                });
        } else {
            setAvailableMonths([]);
        }
    }, [clientNumber]);

    const handleDownload = () => {
        window.open(`/api/download?client_number=${clientNumber}&reference_month=${referenceMonth}`, '_blank');
    };

    return (
        <Card className="max-w-3xl mx-auto my-8 p-6">
            <CardHeader>
                <h1 className="text-2xl font-bold mb-4">Biblioteca de Faturas</h1>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Select onValueChange={setClientNumber} value={clientNumber}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select client number" />
                        </SelectTrigger>
                        <SelectContent>
                            {clientNumbers.map((number) => (
                                <SelectItem key={number} value={number}>
                                    {number}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-4">
                    <Select onValueChange={setReferenceMonth} value={referenceMonth} disabled={!clientNumber}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select reference month" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableMonths.map((month) => (
                                <SelectItem key={month} value={month}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleDownload} className="mb-4" disabled={!clientNumber || !referenceMonth}>
                    Download Fatura
                </Button>
            </CardContent>
        </Card>
    );
};

export default Library;
