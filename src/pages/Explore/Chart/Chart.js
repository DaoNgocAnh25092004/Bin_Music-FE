import classNames from 'classnames/bind';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Styles from './Chart.module.scss';

const cx = classNames.bind(Styles);

const data = [
    { time: '23:00', songA: 20, songB: 15, songC: 10 },
    { time: '01:00', songA: 50, songB: 14, songC: 12 },
    { time: '03:00', songA: 40, songB: 13, songC: 11 },
    { time: '05:00', songA: 30, songB: 20, songC: 15 },
    { time: '07:00', songA: 40, songB: 25, songC: 20 },
    { time: '09:00', songA: 30, songB: 35, songC: 25 },
    { time: '11:00', songA: 45, songB: 30, songC: 22 },
    { time: '13:00', songA: 43, songB: 28, songC: 20 },
    { time: '15:00', songA: 42, songB: 27, songC: 18 },
    { time: '17:00', songA: 41, songB: 26, songC: 17 },
    { time: '19:00', songA: 39, songB: 25, songC: 16 },
    { time: '21:00', songA: 37, songB: 23, songC: 15 },
];

// Thành phần Tooltip tùy chỉnh
function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        const song = payload[0]; // Lấy dữ liệu từ điểm hiện tại
        const { color, value, name } = song;

        return (
            <div
                style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        marginRight: '10px',
                        background: color,
                    }}
                ></div>
                <div>
                    <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{name}</p>
                    <p style={{ fontSize: '12px', margin: 0 }}>Tỷ lệ: {value}%</p>
                    <p style={{ fontSize: '12px', margin: 0 }}>Thời gian: {label}</p>
                </div>
            </div>
        );
    }

    return null;
}

function Chart() {
    return (
        <div>
            <ResponsiveContainer className={cx('chart')}>
                <LineChart data={data}>
                    {/* Grid */}
                    <CartesianGrid horizontal={true} vertical={false} strokeDasharray="4 4" stroke="#555" />
                    {/* Trục X */}
                    <XAxis
                        dataKey="time"
                        stroke="#ddd"
                        interval={0}
                        tick={{ fontSize: 12, fill: 'var(--gray-light-color)', fontWeight: 'bold' }}
                        strokeDasharray="4 4"
                        padding={{ left: 10, right: 10 }}
                    />
                    {/* Tooltip */}
                    <Tooltip content={<CustomTooltip />} />
                    {/* Các đường biểu diễn */}
                    <Line type="monotone" dataKey="songA" stroke="var(--blue-light-color)" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="songB" stroke="var(--green-color)" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="songC" stroke="var(--red-color)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;
