'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Table, Select, Input, Button, Row, Col, Spin } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const { Option } = Select;

const DataTable = ({ data, locale = 'zh' }) => {
  const texts = {
    zh: {
      title: {
        full: "全程马拉松",
        half: "半程马拉松",
        recovery: "恢复跑",
        easyslow: "轻松跑慢",
        easyfast: "轻松跑快",
        lsd: "LSD",
        tempo: "马配",
        strenght: "力量跑",
        ten: "10公里",
        five: "5公里"
      },
      plan: {
        beginner: "初学者",
        advanced: "进阶者",
        warmUp: "热身",
        coolDown: "放松",
        raceDate: "比赛日期",
        selectPlan: "选择计划",
        getPDF: "获取PDF",
        viewTrainingPlan: "查看训练计划",
        pleaseSelect: "请选择周六或周日作为比赛日",
        weeks: "周"
      },
      days: {
        monday: "周一",
        tuesday: "周二", 
        wednesday: "周三",
        thursday: "周四",
        friday: "周五",
        saturday: "周六",
        sunday: "周日"
      }
    },
    en: {
      title: {
        full: "Full Marathon",
        half: "Half Marathon",
        recovery: "Rest",
        easyslow: "Easy Slow",
        easyfast: "Easy Fast",
        lsd: "LSD",
        tempo: "MP",
        strenght: "@MP-10",
        ten: "10 KM",
        five: "5 KM"
      },
      plan: {
        beginner: "Beginner",
        advanced: "Advanced",
        warmUp: "Warm up",
        coolDown: "Cool down",
        raceDate: "Race Date",
        selectPlan: "Select Plan",
        getPDF: "Get PDF",
        viewTrainingPlan: "View Training Plan",
        pleaseSelect: "Please select Saturday or Sunday only",
        weeks: "Weeks"
      },
      days: {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday", 
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday"
      }
    }
  };

  const t = texts[locale] || texts.zh;

  const [tableData, setTableData] = useState(data);
  const [showAll, setShowAll] = useState(true);
  const [selectedDataRow, setSelectedDataRow] = useState(null);
  const [selectedPlanData, setSelectedPlanData] = useState([]);
  const [warm, setWarm] = useState('1.6');
  const [cold, setCold] = useState('1.6');
  const [loading, setLoading] = useState(false);
  const [planType, setPlanType] = useState('basic');
  const [raceDate, setRaceDate] = useState('');
  const [basicPlan, setBasicPlan] = useState([]);
  const [advancePlan, setAdvancePlan] = useState([]);
  const [planDates, setPlanDates] = useState({});

  const options = [
    { value: 'basic', label: t.plan.beginner },
    { value: 'advance', label: t.plan.advanced },
  ];

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    // Load training plans based on locale
    const planSuffix = locale === 'zh' ? '-zh' : '';
    Promise.all([
      fetch(`/data/basicPlan${planSuffix}.json`).then(res => res.json()),
      fetch(`/data/advancePlan${planSuffix}.json`).then(res => res.json())
    ]).then(([basic, advance]) => {
      setBasicPlan(basic);
      setAdvancePlan(advance);
      setSelectedPlanData(basic);
    }).catch(error => console.error('Error loading training plans:', error));
  }, [locale]);

  const selectOne = (value) => {
    if (value === 'basic') {
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
        if (planType === t.plan.advanced) planData = advancePlan;
        
        const weekData = planData[weekIndex];
        const dayData = weekData?.schedule?.[dayIndex];
        const description = dayData?.desc || '';
        
        // 使用 type 字段判断是否为休息日
        const type = dayData?.type || '';
        const isRestDay = type.toLowerCase() === 'rest';
        
        // 日期格式：月/日
        const dateStr = currentDate.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { month: 'numeric', day: 'numeric' });
        
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
      title: <div style={{textAlign: 'center'}}>{t.title.full}</div>,
      dataIndex: 'full', 
      key: 'full',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.title.half}</div>, 
      dataIndex: 'half', 
      key: 'half',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.title.recovery}</div>, 
      dataIndex: 'recovery', 
      key: 'recovery',
      align: 'center',
      width: 100
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.title.easyslow}</div>, 
      dataIndex: 'easyslow', 
      key: 'easyslow',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.title.easyfast}</div>, 
      dataIndex: 'easyfast', 
      key: 'easyfast',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.title.lsd}</div>, 
      dataIndex: 'lsd', 
      key: 'lsd',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.title.tempo}</div>, 
      dataIndex: 'tempo', 
      key: 'tempo',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.title.strenght}</div>, 
      dataIndex: 'strenght', 
      key: 'strenght',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.title.ten}</div>, 
      dataIndex: 'ten', 
      key: 'ten',
      align: 'center',
      width: 140
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.title.five}</div>, 
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
      title: <div style={{textAlign: 'center'}}>{t.days.monday}</div>, 
      key: 'monday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 0, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.days.tuesday}</div>, 
      key: 'tuesday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 1, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.days.wednesday}</div>, 
      key: 'wednesday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 2, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.days.thursday}</div>, 
      key: 'thursday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 3, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.days.friday}</div>, 
      key: 'friday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 4, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.days.saturday}</div>, 
      key: 'saturday', 
      width: 160,
      render: (record, _, index) => (
        <div className="plan-cell">
          {descriptionOfWeekDay(record, 5, index)}
        </div>
      )
    },
    { 
      title: <div style={{textAlign: 'center'}}>{t.days.sunday}</div>, 
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
                    <label>{t.plan.warmUp}</label>
                    <Input
                      value={warm}
                      onChange={(e) => setWarm(e.target.value)}
                      placeholder={t.plan.warmUp}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="input-group">
                    <label>{t.plan.coolDown}</label>
                    <Input
                      value={cold}
                      onChange={(e) => setCold(e.target.value)}
                      placeholder={t.plan.coolDown}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="input-group">
                    <label>{t.plan.raceDate}</label>
                    <Input
                      type="date"
                      value={raceDate}
                      onChange={(e) => {
                        setRaceDate(e.target.value);
                      }}
                      onBlur={(e) => {
                        const date = new Date(e.target.value);
                        const day = date.getDay();
                        if (e.target.value && day !== 0 && day !== 6) { // 0 = Sunday, 6 = Saturday
                          alert(t.plan.pleaseSelect);
                          setRaceDate('');
                        }
                      }}
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
                  columns={[
                    { 
                      title: '', 
                      dataIndex: 'week', 
                      key: 'week', 
                      width: 60,
                      align: 'center'
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.monday}</div>, 
                      key: 'monday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 0, index)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.tuesday}</div>, 
                      key: 'tuesday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 1, index)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.wednesday}</div>, 
                      key: 'wednesday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 2, index)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.thursday}</div>, 
                      key: 'thursday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 3, index)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.friday}</div>, 
                      key: 'friday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 4, index)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.saturday}</div>, 
                      key: 'saturday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 5, index)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.sunday}</div>, 
                      key: 'sunday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 6, index)}
                        </div>
                      )
                    },
                  ]}
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
                  columns={[
                    { 
                      title: '', 
                      dataIndex: 'week', 
                      key: 'week', 
                      width: 60,
                      align: 'center'
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.monday}</div>, 
                      key: 'monday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 0, index + 9)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.tuesday}</div>, 
                      key: 'tuesday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 1, index + 9)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.wednesday}</div>, 
                      key: 'wednesday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 2, index + 9)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.thursday}</div>, 
                      key: 'thursday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 3, index + 9)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.friday}</div>, 
                      key: 'friday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 4, index + 9)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.saturday}</div>, 
                      key: 'saturday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 5, index + 9)}
                        </div>
                      )
                    },
                    { 
                      title: <div style={{textAlign: 'center'}}>{t.days.sunday}</div>, 
                      key: 'sunday', 
                      width: 160,
                      render: (record, _, index) => (
                        <div className="plan-cell">
                          {descriptionOfWeekDay(record, 6, index + 9)}
                        </div>
                      )
                    },
                  ]}
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
            {t.plan.getPDF}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;