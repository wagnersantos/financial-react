/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  const balanceIncome = formatValue(balance.income);
  const balanceOutcome = formatValue(balance.outcome);
  const balanceTotal = formatValue(balance.total);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      try {
        const { data } = await api.get('/transactions');

        setTransactions(data.transactions);
        setBalance(data.balance);
      } catch (err) {
        console.log(err.response.error);
      }
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balanceIncome}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balanceOutcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balanceTotal}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions?.map(
                ({ id, title, type, value, category, created_at }) => {
                  const formattedValue = formatValue(value);
                  const formatType =
                    type === 'outcome' ? `- ${formattedValue}` : formattedValue;

                  return (
                    <tr key={id}>
                      <td className="title">{title}</td>
                      <td className={type}>{formatType}</td>
                      <td>{category.title}</td>
                      <td>{formatDate(String(created_at))}</td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
