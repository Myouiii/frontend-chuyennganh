import { BarChartOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import statisticApi from '~/apis/statisticApi';
import helpers from '~/helpers';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// tạo danh sách năm
function generateLabels(
  startYear = new Date().getFullYear(),
  endYear = new Date().getFullYear(),
) {
  let result = [];
  for (let i = startYear; i <= endYear; ++i) {
    result.push(`${i}`);
  }
  return result;
}

function AnnualRevenue() {
  const startYear = 2019;
  const endYear = new Date().getFullYear();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // event: thống kê
  useEffect(() => {
    let isSubscribe = true;
    async function getStaAnnualRevenue() {
      try {
        const response = await statisticApi.getStaAnnualRevenue(
          startYear,
          endYear,
        );
        if (isSubscribe && response) {
          const { data } = response.data;
          setData(data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isSubscribe) setIsLoading(false);
      }
    }
    getStaAnnualRevenue();
    return () => {
      isSubscribe = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin
          tip="Đang thống kê ..."
          size="large"
          indicator={<BarChartOutlined spin />}
        />
      ) : (
        <Line
          data={{
            labels: generateLabels(2019, endYear),
            datasets: [
              {
                backgroundColor: '#2EA62A',
                data: [...data],
                label: `Doanh thu`,
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: `Doanh thu theo từng năm từ năm ${startYear} đến ${endYear}`,
              fontSize: 18,
            },
            scales: {
              y: 
                {
                  ticks: {
                    callback: function(value, index, values) {
                      return value >= 1000000000
                        ? `${(value / 1000000000).toFixed(1)} tỷ`
                        : value >= 1000000
                        ? `${(value / 1000000).toFixed(1)} tr`
                        : helpers.formatProductPrice(value);
                    },
                  },
                },
              
            },
          }}
        />
      )}
    </>
  );
}

export default AnnualRevenue;
