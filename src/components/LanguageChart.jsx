import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const LanguageChart = ({ languageData }) => {
  const [loading, setLoading] = useState(true);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Simulamos un pequeño retraso para la carga de datos
  useEffect(() => {
    if (languageData && languageData.length > 0) {
      setLoading(false);
    }
  }, [languageData]);

  return (
    <div style={{ width: '100%', height: 300 }}>
      {loading ? (
        <div className="loading-spinner" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <div className="spinner" style={{ display: 'inline-block', border: '4px solid rgba(0,0,0,0.1)', borderTop: '4px solid #0088FE', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={languageData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {languageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default LanguageChart;
