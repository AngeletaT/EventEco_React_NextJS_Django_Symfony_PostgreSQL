"use client";

import React from "react";
import { useState } from "react";
import { getMetrics } from "@/services/eventeco/queries/mockMetrics";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import styles from "@/styles/eventeco/Organizer/Metrics.module.css";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const Metrics: React.FC = () => {
    const { metrics } = getMetrics();
    const [revenueMonths, setRevenueMonths] = useState(12);
    const [ticketMonths, setTicketMonths] = useState(12);

    const parseRevenue = (value: string) => {
        return parseFloat(value.replace(/\./g, "").replace(",", "."));
    };

    const monthlyRevenue = metrics.last_year_event_revenue
        .map((m) => ({
            month: m.month,
            revenue: parseRevenue(m.revenue),
        }))
        .slice(-revenueMonths);

    const ticketVolume = metrics.monthly_ticket_volume.slice(-ticketMonths);

    const categoriesRevenue = metrics.categories_revenue.map((cat) => ({
        name: cat.category,
        value: parseRevenue(cat.revenue),
    }));

    const addonsRevenue = metrics.addons_revenue.map((a) => ({
        name: a.name,
        units: a.units_sold,
        revenue: parseRevenue(a.revenue),
    }));

    const statusData = Object.entries(metrics.events_by_status).map(([key, value]) => ({
        name: key,
        value: value,
    }));

    const MonthButtons = ({ current, onChange }: { current: number; onChange: (v: number) => void }) => (
        <div className="flex gap-2 mb-2 text-xs">
            {[3, 6, 12].map((num) => (
                <button
                    key={num}
                    onClick={() => onChange(num)}
                    className={`p-button p-button-success p-button-sm ${
                        current === num ? "p-button-raised active bg-green-500 text-white" : "bg-gray-200"
                    }`}
                >
                    {num}
                </button>
            ))}
        </div>
    );

    return (
        <div className={styles.container}>
            <h1 className="text-2xl font-bold">📊 Panel de Métricas del Organizador</h1>

            <div className={styles.kpiGrid}>
                <KPI label="Ingresos Totales" value={metrics.total_event_revenue} />
                <KPI label="Entradas Vendidas" value={metrics.total_sold_tickets} />
                <KPI label="Valoración Media" value={`${metrics.average_customer_rating} ⭐`} />
            </div>
            <div className={styles.column}>
                <div className={styles.detailsGrid}>
                    <InfoCard
                        title="🏆 Evento más rentable"
                        subtitle={metrics.most_valuable_event.name}
                        value={metrics.most_valuable_event.revenue}
                    />
                    <InfoCard
                        title="🎫 Entrada más rentable"
                        subtitle={metrics.most_valuable_ticket.type}
                        value={metrics.most_valuable_ticket.revenue}
                    />
                    <InfoCard
                        title="🥤 Complemento más rentable"
                        subtitle={metrics.most_valuable_complement.name}
                        value={metrics.most_valuable_complement.revenue}
                    />
                    <InfoCard
                        title="🌟 Mejor valorado"
                        subtitle={metrics.top_rated_event.name}
                        value={`${metrics.top_rated_event.average_rating} ⭐`}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.chartCard}>
                    <div className={styles.chartCardHeader}>
                        <h3>💰 Ingresos últimos {revenueMonths} meses</h3>
                        <MonthButtons current={revenueMonths} onChange={setRevenueMonths} />
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={monthlyRevenue}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.chartCard}>
                    <div className={styles.chartCardHeader}>
                        <h3>🎟️ Tickets vendidos por mes</h3>
                        <MonthButtons current={ticketMonths} onChange={setTicketMonths} />
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={ticketVolume}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="tickets_sold" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.chartCard}>
                    <h3>📁 Recaudación por categoría</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={categoriesRevenue} dataKey="value" nameKey="name" outerRadius={90} label>
                                {categoriesRevenue.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.chartCard}>
                    <h3>🎁 Complementos más vendidos</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={addonsRevenue} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" width={100} />
                            <Tooltip />
                            <Bar dataKey="units" fill="#f59e0b" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Metrics;

const KPI = ({ label, value }: { label: string; value: string | number }) => (
    <div className={styles.kpiCard}>
        <p className={styles.kpiLabel}>{label}</p>
        <p className={styles.kpiValue}>{value}</p>
    </div>
);

const InfoCard = ({ title, subtitle, value }: { title: string; subtitle: string; value: string }) => (
    <div className={styles.detailBox}>
        <h4>{title}</h4>
        <p className="font-medium">{subtitle}</p>
        <p className="text-sm text-gray-600">{value}</p>
    </div>
);
