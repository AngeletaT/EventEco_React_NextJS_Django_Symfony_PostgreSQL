// src/pages/dashboard-organizer/Metrics.tsx
"use client";

import React from "react";
import styles from "@/styles/pawnity/Organizer/DashboardMetrics.module.css";
import { getMetrics } from "@/services/pawnity/queries/mockMetrics";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const COLORS = [
    "#00C49F",  // verde
    "#EF4444", // rojo vibrante y legible
    "#FF8042",  // naranja
    "#8884d8",  // lila
    "#4FC3F7",  // azul claro ✅
];



const Metrics: React.FC = () => {
    const { metrics } = getMetrics();

    const parseRevenue = (value: string) =>
        parseFloat(value.replace(/\./g, "").replace(",", "."));

    // DATA TRANSFORMATIONS
    const monthlyRevenue = metrics.last_year_event_revenue.map((m) => ({
        month: m.month,
        Ingresos: parseRevenue(m.revenue),
    }));

    const ticketVolume = metrics.monthly_ticket_volume;

    const categoriesRevenue = metrics.categories_revenue.map((cat) => ({
        name: cat.category,
        value: parseRevenue(cat.revenue),
    }));


    const addonsRevenue = metrics.addons_revenue.map((a) => ({
        name: a.name,
        Uds: a.units_sold,
        revenue: parseRevenue(a.revenue),
    }));

    const statusData = Object.entries(metrics.events_by_status).map(
        ([key, value]) => ({
            name: key,
            value,
        })
    );


    const KPIGrid = ({ metrics }: any) => (
        <div className={styles.kpiGrid}>
            <KPI label="💰 Ingresos Totales" value={metrics.total_event_revenue} />
            <KPI label="🎫 Entradas Vendidas" value={`${metrics.total_sold_tickets}`} />
            <KPI label="🐶 Adopciones" value={metrics.total_adoptions} />
            <KPI label="🫂 Apadrinamientos" value={metrics.total_sponsorships} />
            <KPI label="⭐ Valoración Media" value={`${metrics.average_customer_rating}/5`} />
        </div>
    );

    const ChartSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className={styles.chartSection}>
            <h2 className={styles.chartTitle}>{title}</h2>
            <ResponsiveContainer width="100%" height={300}>
                {children}
            </ResponsiveContainer>
        </div>
    );

    const InfoCardsGrid = ({ metrics }: any) => (
        <div className={styles.infoGrid}>
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
        </div>
    );

    const RatingHighlight = ({ metrics }: any) => (
        <div className={styles.ratingCard}>
            <h2 className={styles.chartTitle}>🌟 Evento mejor valorado</h2>
            <p className={styles.ratingName}>{metrics.top_rated_event.name}</p>
            <p className={styles.ratingValue}>{metrics.top_rated_event.average_rating} ⭐</p>
        </div>
    );

    const KPI = ({ label, value }: { label: string; value: string | number }) => (
        <div className={styles.kpiCard}>
            <p className={styles.kpiLabel}>{label}</p>
            <p className={styles.kpiValue}>{value}</p>
        </div>
    );

    const InfoCard = ({ title, subtitle, value }: { title: string; subtitle: string; value: string }) => (
        <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>{title}</h3>
            <p className={styles.infoSubtitle}>{subtitle}</p>
            <p className={styles.infoValue}>{value}</p>
        </div>
    );


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>📊 Panel de Métricas del Organizador</h1>

            <KPIGrid metrics={metrics} />

            <RatingHighlight metrics={metrics} />

            <InfoCardsGrid metrics={metrics} />

            <ChartSection title="💰 Ingresos últimos 12 meses">
                <LineChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value} €`} />
                    <Tooltip formatter={(value: number) => `${value} €`} />
                    <Line type="monotone" dataKey="Ingresos" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ChartSection>

            <ChartSection title="🎟️ Tickets vendidos por mes">
                <BarChart data={ticketVolume}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 700]} />
                    <Tooltip />
                    <Bar dataKey="Tickets Vendidos" fill="#4FC3F7" />
                    <Line type="monotone" dataKey="tickets_sold" stroke="#2563eb" strokeWidth={2} />
                </BarChart>
            </ChartSection>

            <ChartSection title="📁 Recaudación de eventos por categoría">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={categoriesRevenue}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={150}
                            label={({ value }) => ` ${value} €`}
                        >
                            {categoriesRevenue.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value} €`} />
                        <Legend
                            layout="vertical"
                            align="left"
                            verticalAlign="middle"
                            iconType="circle"
                            wrapperStyle={{ fontSize: "1.3rem", fontWeight: 600, color: "#374151" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </ChartSection>


            <ChartSection title="🎁 Complementos vendidos">
                <BarChart data={addonsRevenue} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={150} />
                    <Tooltip />
                    <Bar dataKey="Uds" fill="#f59e0b" />
                </BarChart>
            </ChartSection>

            <ChartSection title="📅 Estado de los eventos">
                <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={100} label>
                        {statusData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        wrapperStyle={{ fontSize: "1.3rem", fontWeight: 600, color: "#374151" }}
                    />
                </PieChart>
            </ChartSection>

        </div>
    );
};

export default Metrics;
