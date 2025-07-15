'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Table, Select, Input, Button, Row, Col, Spin } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const { Option } = Select;

const DataTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [showAll, setShowAll] = useState(true);
  const [selectedDataRow, setSelectedDataRow] = useState(null);
  const [selectedPlanData, setSelectedPlanData] = useState([]);
  const [warm, setWarm] = useState('1.6');
  const [cold, setCold] = useState('1.6');
  const [loading, setLoading] = useState(false);
  const [planType, setPlanType] = useState('Beginner');
  const [raceDate, setRaceDate] = useState('');
  const [basicPlan, setBasicPlan] = useState([]);
  const [advancePlan, setAdvancePlan] = useState([]);
  const [planDates, setPlanDates] = useState({});

  const options = [
    { value: 'basic', label: 'Beginner' },
    { value: 'advance', label: 'Advanced' },
  ];

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    // Load training plans
    Promise.all([
      fetch('/data/basicPlan.json').then(res => res.json()),
      fetch('/data/advancePlan.json').then(res => res.json())
    ]).then(([basic, advance]) => {
      setBasicPlan(basic);
      setAdvancePlan(advance);
      setSelectedPlanData(basic);
    }).catch(error => console.error('Error loading training plans:', error));
  }, []);

  const selectOne = (value) => {
    if (value === 'Beginner') {
      setSelectedPlanData(basicPlan);
    } else {
      setSelectedPlanData(advancePlan);
    }
  };

  const rowClick = (record) => {
    if (showAll) {
      setTableData([record]);
      setSelectedDataRow(record);
      setShowAll(false);
    } else {
      setTableData(data);
      setSelectedDataRow(null);
      setShowAll(true);
    }
  };

  const secondOfString = useCallback((time) => {
    const timeArray = time.split(':');
    return parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
  }, []);

  const stringOfSecond = useCallback((second) => {
    const hour = Math.floor(second / 3600);
    const minute = Math.floor((second - hour * 3600) / 60);
    const sec = Math.round(second % 60);
    return hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
  }, []);

  const distanceOfDay = useCallback((week, day, warmUp, coolDown) => {
    const runSchedule = week.schedule[day];
    let distance = 0;
    
    if (runSchedule.warm && warmUp.length > 0) {
      distance += parseFloat(warmUp);
    }

    for (const run of runSchedule.excise) {
      distance += run.distance;
    }

    if (runSchedule.cold && coolDown.length > 0) {
      distance += parseFloat(coolDown);
    }
    
    return distance;
  }, []);

  const distanceOfDayString = useCallback((week, day, warmUp, coolDown) => {
    const runSchedule = week.schedule[day];
    let runDistance = '';
    let distance = 0;
    
    if (runSchedule.warm && warmUp.length > 0) {
      runDistance += parseFloat(warmUp).toFixed(1);
      runDistance += '+';
    }

    for (const run of runSchedule.excise) {
      distance += run.distance;
    }
    
    if (distance > 0) {
      runDistance = runDistance + distance.toFixed(1);
    }

    if (runSchedule.cold && coolDown.length > 0) {
      runDistance += '+';
      runDistance += parseFloat(coolDown).toFixed(1);
    }
    
    return runDistance;
  }, []);

  const durationOfDay = useCallback((week, day, row, warmUp, coolDown) => {
    const runSchedule = week.schedule[day];
    if (!row) return '';

    let slowDuration = 0;
    let fastDuration = 0;

    for (const run of runSchedule.excise) {
      const distance = run.distance;
      const type = run.paceType;
      let slowSecond = 0;
      let fastSecond = 0;

      if (type === 'speed') {
        fastSecond = secondOfString(row.five);
        slowSecond = secondOfString(row.ten);
      } else if (type === 'easy') {
        slowSecond = secondOfString(row.easyslow);
        fastSecond = secondOfString(row.easyfast);
      } else if (type === 'recover') {
        slowSecond = secondOfString(row.recovery);
        fastSecond = secondOfString(row.recovery);
      } else if (type === 'lsd') {
        slowSecond = secondOfString(row.lsd);
        fastSecond = secondOfString(row.lsd);
      } else if (type === 'strenght') {
        slowSecond = secondOfString(row.strenght);
        fastSecond = secondOfString(row.strenght);
      } else if (type === 'tempo') {
        slowSecond = secondOfString(row.tempo);
        fastSecond = secondOfString(row.tempo);
      }

      slowDuration += distance * slowSecond;
      fastDuration += distance * fastSecond;
    }

    const easySlowSecond = secondOfString(row.easyslow);
    const easyFastSecond = secondOfString(row.easyfast);

    if (runSchedule.warm && warmUp.length > 0) {
      slowDuration += parseFloat(warmUp) * easySlowSecond;
      fastDuration += parseFloat(warmUp) * easyFastSecond;
    }

    if (runSchedule.cold && coolDown.length > 0) {
      slowDuration += parseFloat(coolDown) * easySlowSecond;
      fastDuration += parseFloat(coolDown) * easyFastSecond;
    }

    if (slowDuration === 0) return '';

    return stringOfSecond(slowDuration);
  }, [secondOfString, stringOfSecond]);

  const exciseDiscriptionOfDay = useCallback((week, day) => {
    return week.schedule[day].excisedesc || '';
  }, []);

  const descriptionOfWeekDay = useCallback((week, day, weekIndex) => {
    const description = week.schedule[day].desc;
    const exciseDesc = exciseDiscriptionOfDay(week, day);
    const distance = distanceOfDayString(week, day, warm, cold);
    const duration = durationOfDay(week, day, selectedDataRow, warm, cold);
    
    // 获取日期
    const dateKey = `${weekIndex}-${day}`;
    const dateStr = planDates[dateKey] || '';
    

    return (
      <div className="plan-cell">
        {dateStr && <div className="plan-date">{dateStr}</div>}
        <div className="plan-content">
          <div>{description}</div>
          {exciseDesc && <div>{exciseDesc}</div>}
          {distance.length > 0 && <div>{distance} KM</div>}
        </div>
        {duration.length > 0 && <div className="plan-duration">{duration}</div>}
      </div>
    );
  }, [exciseDiscriptionOfDay, distanceOfDayString, durationOfDay, warm, cold, selectedDataRow, planDates]);

  const distanceOfWeek = useCallback((week) => {
    let distance = 0;
    for (let i = 0; i < week.schedule.length; i++) {
      const distanceDay = distanceOfDay(week, i, warm, cold);
      distance += distanceDay;
    }
    return distance.toFixed(1);
  }, [distanceOfDay, warm, cold]);

  const calculatePlanDates = useCallback((raceDateStr) => {
    if (!raceDateStr) return {};
    
    const raceDate = new Date(raceDateStr);
    const raceDay = raceDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    // 训练计划总共18周，126天
    const totalDays = 18 * 7;
    const planStartDate = new Date(raceDate);
    planStartDate.setDate(raceDate.getDate() - totalDays + 1);
    
    const dates = {};
    let currentDate = new Date(planStartDate);
    
    for (let weekIndex = 0; weekIndex < 18; weekIndex++) {
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const key = `${weekIndex}-${dayIndex}`;
        const isRaceWeek = weekIndex === 17;
        
        // 获取当天训练内容
        let planData = basicPlan;
        if (planType === 'Advanced') planData = advancePlan;
        
        const weekData = planData[weekIndex];
        const dayData = weekData?.schedule?.[dayIndex];
        const description = dayData?.desc || '';
        
        // 使用 type 字段判断是否为休息日
        const type = dayData?.type || '';
        const isRestDay = type.toLowerCase() === 'rest';
        
        // 日期格式：月/日
        const dateStr = currentDate.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
        
        if (isRaceWeek) {
          if (raceDay === 0 && dayIndex === 6) { // Race on Sunday
            dates[key] = dateStr;
          } else if (raceDay === 6 && dayIndex === 5) { // Race on Saturday
            dates[key] = dateStr;
          } else if (raceDay === 6 && dayIndex === 6) { // Race on Saturday, Sunday empty
            dates[key] = ''; // Sunday empty
          } else {
            dates[key] = isRestDay ? '' : dateStr;
          }
        } else {
          // 非比赛周，休息日不显示日期
          dates[key] = isRestDay ? '' : dateStr;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    return dates;
  }, [planType, basicPlan, advancePlan]);

  useEffect(() => {
    if (raceDate && basicPlan.length > 0 && advancePlan.length > 0) {
      const dates = calculatePlanDates(raceDate);
      setPlanDates(dates);
    }
  }, [raceDate, calculatePlanDates, basicPlan, advancePlan]);

  const handlePrint = async () => {
    window.pageYOffset = 100;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    setLoading(true);

    try {
      // Make PDF content visible temporarily
      const pdfElement = document.querySelector('#printplan-pdf');
      const originalStyle = pdfElement.style.cssText;
      pdfElement.style.cssText = 'position: absolute; left: 0; top: 0; visibility: visible; z-index: 9999; background: white;';

      // Create PDF
      const PDF = new jsPDF('p', 'pt', 'a4');

      // Generate first page (first 9 weeks)
      const page1Element = document.querySelector('#pdf-page1');
      const canvas1 = await html2canvas(page1Element, {
        allowTaint: true,
        useCORS: true,
        scale: 1,
        logging: false,
      });

      const page1Width = canvas1.width;
      const page1Height = canvas1.height;
      const page1Ratio = Math.min(595.28 / page1Width, 842 / page1Height) * 0.95;
      const page1ImgWidth = page1Width * page1Ratio;
      const page1ImgHeight = page1Height * page1Ratio;
      const page1Data = canvas1.toDataURL('image/jpeg', 1.0);
      PDF.addImage(page1Data, 'JPEG', (595.28 - page1ImgWidth) / 2, 20, page1ImgWidth, page1ImgHeight);

      // Generate second page (last 9 weeks)
      const page2Element = document.querySelector('#pdf-page2');
      const canvas2 = await html2canvas(page2Element, {
        allowTaint: true,
        useCORS: true,
        scale: 1,
        logging: false,
      });

      const page2Width = canvas2.width;
      const page2Height = canvas2.height;
      const page2Ratio = Math.min(595.28 / page2Width, 842 / page2Height) * 0.95;
      const page2ImgWidth = page2Width * page2Ratio;
      const page2ImgHeight = page2Height * page2Ratio;
      const page2Data = canvas2.toDataURL('image/jpeg', 1.0);
      
      // Add new page for second table
      PDF.addPage();
      PDF.addImage(page2Data, 'JPEG', (595.28 - page2ImgWidth) / 2, 20, page2ImgWidth, page2ImgHeight);

      // Hide PDF content again
      pdfElement.style.cssText = originalStyle;

      PDF.save('plan.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  const paceColumns = [
    { 
      title: <div style={{textAlign: 'center'}}>Full Marathon</div>,
      dataIndex: 'full', 
      key: 'full',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>Half Marathon</div>, 
      dataIndex: 'half', 
      key: 'half',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>Rest</div>, 
      dataIndex: 'recovery', 
      key: 'recovery',
      align: 'center',
      width: 100
    },
    { 
      title: <div style={{textAlign: 'center'}}>Easy slow</div>, 
      dataIndex: 'easyslow', 
      key: 'easyslow',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>Easy fast</div>, 
      dataIndex: 'easyfast', 
      key: 'easyfast',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>LSD</div>, 
      dataIndex: 'lsd', 
      key: 'lsd',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>MP</div>, 
      dataIndex: 'tempo', 
      key: 'tempo',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>@MP-10</div>, 
      dataIndex: 'strenght', 
      key: 'strenght',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>10 KM</div>, 
      dataIndex: 'ten', 
      key: 'ten',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>5 KM</div>, 
      dataIndex: 'five', 
      key: 'five',
      align: 'center',
      width: 140
    },
  ];

  const planColumns = [
    { 
      title: '', 
      dataIndex: 'week', 
      key: 'week', 
      width: 60,
      align: 'center'
    },
    { 
      title: <div style={{textAlign: 'center'}}>Monday</div>, 
      key: 'monday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 0, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>Tuesday</div>, 
      key: 'tuesday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 1, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>Wednesday</div>, 
      key: 'wednesday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 2, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>Thursday</div>, 
      key: 'thursday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 3, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>Friday</div>, 
      key: 'friday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 4, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>Saturday</div>, 
      key: 'saturday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 5, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>Sunday</div>, 
      key: 'sunday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 6, index)}
        </div>
      )
    },
  ];

  return (
    <div id="printplan" className="w-full p-5">
      <div className="w-full max-w-7xl mx-auto">
        <div id="pace" className="mb-8">
          <Table
            dataSource={tableData.map((item, index) => ({ ...item, key: index }))}
            columns={paceColumns}
            pagination={false}
            bordered
            size="middle"
            rowClassName="cursor-pointer"
            onRow={(record) => ({
              onClick: () => rowClick(record),
            })}
            className="mb-4"
          />
        </div>

        {!showAll && (
          <div id="plan">
            <div className="controls-row mb-6 no-print">
              <Row gutter={40} align="middle">
                <Col span={6}>
                  <Select
                    value={planType}
                    onChange={(value) => {
                      setPlanType(value);
                      selectOne(value);
                    }}
                    size="large"
                    className="w-full"
                  >
                    {options.map(option => (
                      <Option key={option.value} value={option.label}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={6}>
                  <div className="input-group">
                    <label>Warm up</label>
                    <Input
                      value={warm}
                      onChange={(e) => setWarm(e.target.value)}
                      placeholder="Warm up"
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="input-group">
                    <label>Cool down</label>
                    <Input
                      value={cold}
                      onChange={(e) => setCold(e.target.value)}
                      placeholder="Cool down"
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="input-group">
                    <label>Race Date</label>
                    <input
                      type="date"
                      className="ant-input"
                      value={raceDate}
                      onChange={(e) => {
                        setRaceDate(e.target.value);
                      }}
                      onBlur={(e) => {
                        const date = new Date(e.target.value);
                        const day = date.getDay();
                        if (e.target.value && day !== 0 && day !== 6) { // 0 = Sunday, 6 = Saturday
                          alert('Please select Saturday or Sunday only');
                          setRaceDate('');
                        }
                      }}
                      style={{ width: '100%' }}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div id="planTable">
              <Spin spinning={loading}>
                <Table
                  dataSource={selectedPlanData.map((item, index) => ({ ...item, key: index }))}
                  columns={planColumns}
                  pagination={false}
                  bordered
                  size="middle"
                  scroll={{ x: 'max-content' }}
                />
              </Spin>
            </div>
          </div>
        )}

        {/* Hidden content for PDF generation */}
        <div id="printplan-pdf" style={{position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden'}}>
          {!showAll && (
            <div>
              {/* First page - Pace table + First 9 weeks */}
              <div id="pdf-page1" className="pdf-page pdf-full-height">
                <div className="mb-6">
                  <Table
                    dataSource={[selectedDataRow].filter(Boolean).map((item, index) => ({ ...item, key: index }))}
                    columns={paceColumns}
                    pagination={false}
                    bordered
                    size="middle"
                  />
                </div>
                <Table
                  dataSource={selectedPlanData.slice(0, 9).map((item, index) => ({ ...item, key: index }))}
                  columns={planColumns}
                  pagination={false}
                  bordered
                  size="middle"
                  scroll={{ x: 'max-content' }}
                  className="pdf-plan-table"
                />
              </div>

              {/* Second page - Pace table + Last 9 weeks */}
              <div id="pdf-page2" className="pdf-page pdf-full-height page-break">
                <div className="mb-6">
                  <Table
                    dataSource={[selectedDataRow].filter(Boolean).map((item, index) => ({ ...item, key: index }))}
                    columns={paceColumns}
                    pagination={false}
                    bordered
                    size="middle"
                  />
                </div>
                <Table
                  dataSource={selectedPlanData.slice(9).map((item, index) => ({ ...item, key: index + 9 }))}
                  columns={planColumns}
                  pagination={false}
                  bordered
                  size="middle"
                  scroll={{ x: 'max-content' }}
                  className="pdf-plan-table"
                />
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Button type="primary" size="large" onClick={handlePrint}>
            Get PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;