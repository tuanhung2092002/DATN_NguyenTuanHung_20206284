import React, {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./ChartStyle.module.scss";
import classNames from "classnames/bind";
import {useSelector} from "react-redux";

const cx = classNames.bind(styles);

const Chart = () => {

    const staticResponse = useSelector(state => state.reducerUser.staticResponse);

    const [state1, setState1] = useState({
        series: [
            {
                name: "Bình thường",
                type: "column",
                data: [],
            },
            {
                name: "Quan trọng",
                type: "column",
                data: [],
            },
            {
                name: "Rất quan trọng",
                type: "column",
                data: [],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                stacked: false,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: [1, 1, 4],
            },
            title: {
                text: "Nhiệm vụ hoàn thành",
                align: "left",
                offsetX: 110,
            },
            xaxis: {
                categories: [],
            },
            yaxis: [
                {
                    seriesName: "Income",
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: "#008FFB",
                    },
                    labels: {
                        style: {
                            colors: "#008FFB",
                        },
                    },
                    title: {
                        text: "",
                        style: {
                            color: "#008FFB",
                        },
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                {
                    seriesName: "Cashflow",
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: "#00E396",
                    },
                    labels: {
                        style: {
                            colors: "#00E396",
                        },
                    },
                    title: {
                        text: "",
                        style: {
                            color: "#00E396",
                        },
                    },
                }
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60,
                },
            },
            legend: {
                horizontalAlign: "left",
                offsetX: 40,
            },
        },
    });
    const [state2, setState2] = useState({
        series: [staticResponse?.user?.pending_on_time || 0, staticResponse?.user?.pending_overdue || 0, staticResponse?.user?.completed_on_time || 0, staticResponse?.user?.completed_overdue || 0],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Hoàn thành đúng hạn', 'Hoàn thành quá hạn', 'Chưa hoàn thành quá hạn', 'Chưa hoàn thành còn hạn'],
            title: {
                text: "Tỷ lệ nhiệm vụ hoàn thành",
                align: "left",
                offsetX: 110,
            },
            colors: ['#4CAF50', '#2196F3', '#F44336', '#FF9800'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    });
    const [state3, setState3] = useState({
        series: [
            {
                name: "Hoàn thành đúng hạn",
                data: [10, 15], // Dữ liệu qua các năm
            },
            {
                name: "Hoàn thành quá hạn",
                data: [20, 25],
            },
            {
                name: "Chưa hoàn thành quá hạn",
                data: [5, 10],
            },
            {
                name: "Chưa hoàn thành còn hạn",
                data: [5, 10],
            }
        ],
        options: {
            title: {
                text: "Tình hình nhiệm vụ của các phòng ban",
                align: "left",
                offsetX: 110,
            },
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "45%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: ['#4CAF50', '#2196F3', '#F44336', '#FF9800'],
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: ["Ban điều hành", "Team LGSP"], // Các năm
            },
            yaxis: {
                title: {
                    text: "Đơn vị tính: nhiệm vụ", // Đơn vị chung cho các cột
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val} nhiệm vụ`, // Tooltip thêm đơn vị
                },
            },
            legend: {
                position: "top",
                horizontalAlign: "center",
            },
        },
    });
    const [state4, setState4] = useState({
        series: [{
            name: 'Hoàn thành đúng hạn',
            data: [4, 5, 4]
        }, {
            name: 'Hoàn thành quá hạn',
            data: [3, 3, 0]
        }, {
            name: 'Chưa hoàn thành quá hạn',
            data: [1, 7, 5]
        }, {
            name: 'Chưa hoàn thành còn hạn',
            data: [1, 7, 5]
        }],
        options: {
            title: {
                text: "Tình hình nhiệm vụ của các dự án",
                align: "left",
                offsetX: 110,
            },
            colors: ['#4CAF50', '#2196F3', '#F44336', '#FF9800'],
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                    dataLabels: {
                        total: {
                            enabled: true,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            },
            xaxis: {
                type: 'text',
                categories: ['CRM', 'HRM', 'Hệ thống Giám sát An ninh Mạng'],
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            fill: {
                opacity: 1
            }
        },
    });

    useEffect(() => {
        const tmp1 = [];
        const tmp2 = [];
        const tmp3 = [];
        const tmp4 = [];
        staticResponse?.priority?.map(pri => {
            tmp1.push(pri?.year);
            tmp2.push(pri?.statistics[0]?.total_task);
            tmp3.push(pri?.statistics[1]?.total_task);
            tmp4.push(pri?.statistics[2]?.total_task);
        })
        setState1({
            series: [
                {
                    name: "Bình thường",
                    type: "column",
                    data: tmp2,
                },
                {
                    name: "Quan trọng",
                    type: "column",
                    data: tmp3,
                },
                {
                    name: "Rất quan trọng",
                    type: "column",
                    data: tmp4,
                },
            ],
            options: {
                chart: {
                    height: 350,
                    type: "line",
                    stacked: false,
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [1, 1, 4],
                },
                title: {
                    text: "Nhiệm vụ hoàn thành",
                    align: "left",
                    offsetX: 110,
                },
                xaxis: {
                    categories: tmp1,
                },
                yaxis: [
                    {
                        seriesName: "Income",
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: "#008FFB",
                        },
                        labels: {
                            style: {
                                colors: "#008FFB",
                            },
                        },
                        title: {
                            text: "",
                            style: {
                                color: "#008FFB",
                            },
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                    {
                        seriesName: "Cashflow",
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: "#00E396",
                        },
                        labels: {
                            style: {
                                colors: "#00E396",
                            },
                        },
                        title: {
                            text: "",
                            style: {
                                color: "#00E396",
                            },
                        },
                    }
                ],
                tooltip: {
                    fixed: {
                        enabled: true,
                        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                        offsetY: 30,
                        offsetX: 60,
                    },
                },
                legend: {
                    horizontalAlign: "left",
                    offsetX: 40,
                },
            },
        });
    }, [staticResponse]);

    useEffect(() => {
        const tmp1 = [];
        const tmp2 = [];
        const tmp3 = [];
        const tmp4 = [];
        const tmp5 = [];
        staticResponse?.department?.map(dep => {
            tmp1.push(dep?.name);
            tmp2.push(dep?.pending_on_time);
            tmp3.push(dep?.pending_overdue);
            tmp4.push(dep?.completed_on_time);
            tmp5.push(dep?.completed_overdue);
        })
        setState3({
            series: [
                {
                    name: "Hoàn thành đúng hạn",
                    data: tmp2,
                },
                {
                    name: "Hoàn thành quá hạn",
                    data: tmp3,
                },
                {
                    name: "Chưa hoàn thành quá hạn",
                    data: tmp4,
                },
                {
                    name: "Chưa hoàn thành còn hạn",
                    data: tmp5,
                }
            ],
            options: {
                title: {
                    text: "Tình hình nhiệm vụ của các phòng ban",
                    align: "left",
                    offsetX: 110,
                },
                chart: {
                    type: "bar",
                    height: 350,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "45%",
                        endingShape: "rounded",
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                colors: ['#4CAF50', '#2196F3', '#F44336', '#FF9800'],
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"],
                },
                xaxis: {
                    categories: tmp1, // Các năm
                },
                yaxis: {
                    title: {
                        text: "Đơn vị tính: nhiệm vụ", // Đơn vị chung cho các cột
                    },
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${val} nhiệm vụ`, // Tooltip thêm đơn vị
                    },
                },
                legend: {
                    position: "top",
                    horizontalAlign: "center",
                },
            },
        });
    }, [staticResponse]);

    useEffect(() => {
        const tmp1 = [];
        const tmp2 = [];
        const tmp3 = [];
        const tmp4 = [];
        const tmp5 = [];
        staticResponse?.project?.map(pro => {
            tmp1.push(pro?.name);
            tmp2.push(pro?.pending_on_time);
            tmp3.push(pro?.pending_overdue);
            tmp4.push(pro?.completed_on_time);
            tmp5.push(pro?.completed_overdue);
        })
        setState4({
            series: [{
                name: 'Hoàn thành đúng hạn',
                data: tmp2,
            }, {
                name: 'Hoàn thành quá hạn',
                data: tmp3,
            }, {
                name: 'Chưa hoàn thành quá hạn',
                data: tmp4,
            }, {
                name: 'Chưa hoàn thành còn hạn',
                data: tmp5,
            }],
            options: {
                title: {
                    text: "Tình hình nhiệm vụ của các dự án",
                    align: "left",
                    offsetX: 110,
                },
                colors: ['#4CAF50', '#2196F3', '#F44336', '#FF9800'],
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        dataLabels: {
                            total: {
                                enabled: true,
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 900
                                }
                            }
                        }
                    },
                },
                xaxis: {
                    type: 'text',
                    categories: tmp1,
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                }
            },
        });
    }, [staticResponse]);

    useEffect(() => {
        setState2({
            series: [staticResponse?.user?.pending_on_time || 0, staticResponse?.user?.pending_overdue || 0, staticResponse?.user?.completed_on_time || 0, staticResponse?.user?.completed_overdue || 0],
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: ['Hoàn thành đúng hạn', 'Hoàn thành quá hạn', 'Chưa hoàn thành quá hạn', 'Chưa hoàn thành còn hạn'],
                title: {
                    text: "Tỷ lệ nhiệm vụ hoàn thành",
                    align: "left",
                    offsetX: 110,
                },
                colors: ['#4CAF50', '#2196F3', '#F44336', '#FF9800'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
        });
    }, [staticResponse]);

    return (
        <div className={cx('col-md-12', 'row')}>
            <div className={cx('col-md-6')}>
                <ReactApexChart
                    options={state1.options}
                    series={state1.series}
                    type="line"
                    width={'100%'}
                    height={400}
                />
            </div>

            <div className={cx('col-md-6')}>
                <ReactApexChart
                    options={state2.options}
                    series={state2.series}
                    type="pie"
                    width={'100%'}
                    height={400}
                />
            </div>

            <div className={cx('col-md-6')}>
                <ReactApexChart
                    options={state3.options}
                    series={state3.series}
                    type="bar"
                    width={'100%'}
                    height={400}
                />
            </div>

            <div className={cx('col-md-6')}>
                <ReactApexChart
                    options={state4.options}
                    series={state4.series}
                    type="bar"
                    width={'100%'}
                    height={400}
                />
            </div>
        </div>
    );
};

export default Chart;
