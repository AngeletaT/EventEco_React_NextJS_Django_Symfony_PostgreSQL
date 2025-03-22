
export const getMetrics = () => {
     const metrics = {
          "organizer_id": "12345",
          "metrics": {
               "total_event_revenue": "68.420,75 €",
               "total_sold_tickets": 4573,
               "total_adoptions": 73,
               "total_sponsorships": 45,
               "average_customer_rating": 4.3,
               "lead_category_revenue": {
                    "category": "Recaudación de Fondos",
                    "revenue": "25.430,00 €"
               },
               "most_valuable_event": {
                    "event_id": "E001",
                    "name": "Concurso de Belleza Canina",
                    "revenue": "20.175,00 €"
               },
               "most_valuable_ticket": {
                    "type": "Entrada VIP",
                    "revenue": "17.400,00 €"
               },
               "most_valuable_complement": {
                    "name": "Camiseta",
                    "revenue": "1.125,00 €"
               },
               "categories_revenue": [
                    {
                         "category": "Adopción Responsable",
                         "revenue": "6.840,00 €"
                    },
                    {
                         "category": "Concienciación y Educación",
                         "revenue": "4.320,00 €"
                    },
                    {
                         "category": "Recaudación de Fondos",
                         "revenue": "25.430,00 €"
                    },
                    {
                         "category": "Actividades al Aire Libre con Mascotas",
                         "revenue": "17.850,00 €"
                    },
                    {
                         "category": "Competiciones y Exhibiciones",
                         "revenue": "13.980 €"
                    }
               ],
               "addons_revenue": [
                    {
                         "name": "Pack Bebida",
                         "units_sold": 128,
                         "revenue": "640,00 €"
                    },
                    {
                         "name": "Camiseta",
                         "units_sold": 75,
                         "revenue": "1.125,00 €"
                    },
                    {
                         "name": "Gorra",
                         "units_sold": 92,
                         "revenue": "736,00 €"
                    },
                    {
                         "name": "Mochila",
                         "units_sold": 38,
                         "revenue": "950,00 €"
                    },
                    {
                         "name": "Pulsera",
                         "units_sold": 210,
                         "revenue": "420,00 €"
                    },
                    {
                         "name": "Poster",
                         "units_sold": 62,
                         "revenue": "186,00 €"
                    },
                    {
                         "name": "Merchandising Variado",
                         "units_sold": 49,
                         "revenue": "980,00 €"
                    },
                    {
                         "name": "Parche",
                         "units_sold": 33,
                         "revenue": "165,00 €"
                    },
                    {
                         "name": "Bolsa de Tela",
                         "units_sold": 57,
                         "revenue": "456,00 €"
                    },
                    {
                         "name": "Taza",
                         "units_sold": 41,
                         "revenue": "615,00 €"
                    }
               ],
               "last_year_event_revenue": [
                    {
                         "month": "2024-04",
                         "revenue": "4.520,00 €"
                    },
                    {
                         "month": "2024-05",
                         "revenue": "3.975,50 €"
                    },
                    {
                         "month": "2024-06",
                         "revenue": "5.080,75 €"
                    },
                    {
                         "month": "2024-07",
                         "revenue": "6.100,00 €"
                    },
                    {
                         "month": "2024-08",
                         "revenue": "6.820,00 €"
                    },
                    {
                         "month": "2024-09",
                         "revenue": "7.590,00 €"
                    },
                    {
                         "month": "2024-10",
                         "revenue": "8.420,00 €"
                    },
                    {
                         "month": "2024-11",
                         "revenue": "9.100,00 €"
                    },
                    {
                         "month": "2024-12",
                         "revenue": "10.200,00 €"
                    },
                    {
                         "month": "2025-01",
                         "revenue": "9.750,00 €"
                    },
                    {
                         "month": "2025-02",
                         "revenue": "10.350,00 €"
                    },
                    {
                         "month": "2025-03",
                         "revenue": "11.500,00 €"
                    }
               ],
               "monthly_ticket_volume": [
                    {
                         "month": "2024-04",
                         "Tickets Vendidos": 312
                    },
                    {
                         "month": "2024-05",
                         "Tickets Vendidos": 278
                    },
                    {
                         "month": "2024-06",
                         "Tickets Vendidos": 344
                    },
                    {
                         "month": "2024-07",
                         "Tickets Vendidos": 390
                    },
                    {
                         "month": "2024-08",
                         "Tickets Vendidos": 420
                    },
                    {
                         "month": "2024-09",
                         "Tickets Vendidos": 450
                    },
                    {
                         "month": "2024-10",
                         "Tickets Vendidos": 470
                    },
                    {
                         "month": "2024-11",
                         "Tickets Vendidos": 510
                    },
                    {
                         "month": "2024-12",
                         "Tickets Vendidos": 535
                    },
                    {
                         "month": "2025-01",
                         "Tickets Vendidos": 548
                    },
                    {
                         "month": "2025-02",
                         "Tickets Vendidos": 560
                    },
                    {
                         "month": "2025-03",
                         "Tickets Vendidos": 606
                    }
               ],
               "events_by_status": {
                    "Activos": 3,
                    "Próximos": 2,
                    "Completados": 7
               },
               "top_rated_event": {
                    "event_id": "E013",
                    "name": "Adopta un Amigo",
                    "average_rating": 4.9
               }
          }
     };
     return metrics;
};