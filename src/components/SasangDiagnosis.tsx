'use client';

import { useState } from 'react';

// 사상체질 설명 사전 정의
const constitutionExplanations = {
  태음인: {
    title: '태음인',
    desc: [
      '체격이 크거나 하체가 발달한 경우가 많음.',
      '성격은 온화하고 인내심이 강함.',
      '폐·피부가 약할 수 있어 운동과 순환을 신경써야 함.'
    ]
  },
  소양인: {
    title: '소양인',
    desc: [
      '상체나 어깨가 발달, 열이 얼굴 쪽에 집중되기 쉬움.',
      '외향적이지만 급한 성격일 수 있음.',
      '소화기 관리와 휴식이 중요.'
    ]
  },
  소음인: {
    title: '소음인',
    desc: [
      '마르고 골격이 크지 않은 편, 손발이 찬 경우 많음.',
      '성격이 내성적·신중함.',
      '소화기 및 체온 관리, 따뜻한 음식 섭취 권장.'
    ]
  },
  태양인: {
    title: '태양인',
    desc: [
      '상대적으로 드문 체질, 어깨가 넓고 하체가 빈약함.',
      '적극적이나 신경이 예민한 경향.',
      '간·소양경의 순환과 스트레스 관리가 필요.'
    ]
  },
  모호: {
    title: '분류 불가(혼합형)',
    desc: [
      '문진 결과로 뚜렷한 체질을 특정하기 어려움.',
      '추가 상담 또는 전문 한의사 진단 권장.'
    ]
  }
};

const questions = [
  // 신체적 특성
  { id: 1, section: '신체', text: '머리가 몸에 비해 큰 편인가요?' },
  { id: 2, section: '신체', text: '어깨가 넓고 상체가 발달한 편인가요?' },
  { id: 3, section: '신체', text: '허벅지·엉덩이 등이 상체보다 두껍거나 잘 발달했나요?' },
  { id: 4, section: '신체', text: '피부가 두껍거나 거친 느낌이 있나요?' },
  { id: 5, section: '신체', text: '몸 전체가 크거나 무겁다는 인상을 주나요?' },
  { id: 6, section: '신체', text: '손발이 자주 차가운 편인가요?' },
  // 성격적 특성
  { id: 7, section: '성격', text: '평소에 차분하고 인내심이 많은 편인가요?' },
  { id: 8, section: '성격', text: '외향적이고 사회성이 좋은 편인가요?' },
  { id: 9, section: '성격', text: '무언가를 할 때 먼저 계획부터 세우는 경향이 있나요?' },
  { id: 10, section: '성격', text: '쉽게 불안하거나 신경이 예민해지는 편인가요?' },
  { id: 11, section: '성격', text: '창의력이 많거나 상상력이 풍부하다고 느끼시나요?' },
  { id: 12, section: '성격', text: '다혈질이거나 충동적인 면이 있나요?' },
  // 주요 증상 및 건강상태
  { id: 13, section: '증상', text: '땀을 많이 흘리며, 땀을 흘리고 나면 상쾌함을 느끼나요?' },
  { id: 14, section: '증상', text: '땀을 흘리면 자주 피곤해지거나 체력이 떨어지나요?' },
  { id: 15, section: '증상', text: '변비 또는 설사 등 소화 문제를 자주 겪나요?' },
  { id: 16, section: '증상', text: '손발 냉증을 자주 느끼나요?' },
  { id: 17, section: '증상', text: '감기, 호흡기 질환에 자주 걸리나요?' },
  { id: 18, section: '증상', text: '허리·관절 등 반복적·지속적으로 아픈 곳이 있나요?' },
];

// 체질 판별 로직
function getConstitution(sectionResult: Record<string, number>) {
  const { 신체 = 0, 성격 = 0, 증상 = 0 } = sectionResult;
  if (신체 >= 4 && 성격 >= 3) return '태음인';
  if (신체 >= 3 && 성격 >= 4) return '소양인';
  if (증상 >= 4 && 신체 <= 2) return '소음인';
  if (성격 >= 4 && 신체 <= 2) return '태양인';
  return '모호';
}

export default function SasangDiagnosis() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // 섹션별 예 답변 수 집계
  const sectionResult = questions.reduce((acc, q) => {
    if (!acc[q.section]) acc[q.section] = 0;
    if (answers[q.id] === 'yes') acc[q.section]++;
    return acc;
  }, {} as Record<string, number>);

  // 체질 결과
  const constitution = getConstitution(sectionResult);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">사상체질 자가진단</h1>
          <p className="text-xl opacity-90 font-light">한의학의 사상체질론을 바탕으로 한 간단한 체질 진단</p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit}>
            {/* Questions */}
            <div className="space-y-6">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="bg-gray-50 rounded-2xl p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-lg font-medium text-gray-800 mb-4">
                    {q.text}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center cursor-pointer p-3 rounded-xl hover:bg-blue-50 transition-colors">
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value="yes"
                        checked={answers[q.id] === 'yes'}
                        onChange={() => handleAnswer(q.id, 'yes')}
                        className="mr-3 scale-125"
                      />
                      <span className="text-lg">예</span>
                    </label>
                    <label className="flex items-center cursor-pointer p-3 rounded-xl hover:bg-blue-50 transition-colors">
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value="no"
                        checked={answers[q.id] === 'no'}
                        onChange={() => handleAnswer(q.id, 'no')}
                        className="mr-3 scale-125"
                      />
                      <span className="text-lg">아니오</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-8 mb-6">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={answeredCount !== questions.length}
              className={`w-full py-4 px-8 rounded-full text-xl font-semibold transition-all duration-300 ${
                answeredCount === questions.length
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:-translate-y-1'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {answeredCount === questions.length ? '결과 확인하기' : `${answeredCount}/${questions.length} 질문 완료`}
            </button>
          </form>

          {/* Results */}
          {submitted && (
            <div className="mt-12 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-3xl p-8 text-center">
              <h3 className="text-3xl font-bold mb-6">진단 결과</h3>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-bold">{sectionResult['신체'] || 0}</div>
                  <div className="text-sm opacity-90">신체적 특성</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-bold">{sectionResult['성격'] || 0}</div>
                  <div className="text-sm opacity-90">성격적 특성</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-bold">{sectionResult['증상'] || 0}</div>
                  <div className="text-sm opacity-90">건강 및 증상</div>
                </div>
              </div>

              {/* Constitution Result */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-2xl font-bold mb-4">
                  예상 체질: {constitutionExplanations[constitution as keyof typeof constitutionExplanations].title}
                </div>
                <ul className="text-left space-y-2">
                  {constitutionExplanations[constitution as keyof typeof constitutionExplanations].desc.map((d, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-yellow-300 font-bold mr-3">•</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-6 text-sm opacity-90">
                ※ 이 결과는 참고용입니다. 보다 정확한 진단은 한의학 전문가 상담이 필요합니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 