'use client';

import { useState } from 'react';

// 다국어 번역 데이터
const translations = {
  ko: {
    title: '사상체질 자가진단',
    subtitle: '한의학의 사상체질론을 바탕으로 한 체질별 점수 진단',
    selectOption: '해당하는 사항을 선택해주세요',
    resultTitle: '진단 결과',
    expectedConstitution: '예상 체질',
    disclaimer: '※ 이 결과는 참고용입니다. 보다 정확한 진단은 한의학 전문가 상담이 필요합니다.',
    restartButton: '다시 진단하기',
    incompleteTitle: '답변하지 않은 문진이 있습니다',
    incompleteDesc: '아래 문진들에 답변해주세요.',
    confirmButton: '확인',
    categories: {
      physical: '신체적 특징',
      facial: '얼굴 특징',
      personality: '성격',
      digestion: '소화 및 식습관',
      sweat: '땀',
      temperature: '온도 민감도',
      sleep: '수면 습관',
      health: '건강 문제',
      activity: '선호 활동',
      emotion: '감정 반응'
    }
  },
  en: {
    title: 'Sasang Constitution Self-Diagnosis',
    subtitle: 'Constitution-based scoring diagnosis based on Korean medicine theory',
    selectOption: 'Please select the applicable option',
    resultTitle: 'Diagnosis Result',
    expectedConstitution: 'Expected Constitution',
    disclaimer: '※ This result is for reference only. For more accurate diagnosis, consultation with a Korean medicine specialist is required.',
    restartButton: 'Restart Diagnosis',
    incompleteTitle: 'There are unanswered questions',
    incompleteDesc: 'Please answer the questions below.',
    confirmButton: 'Confirm',
    categories: {
      physical: 'Physical Characteristics',
      facial: 'Facial Features',
      personality: 'Personality',
      digestion: 'Digestion & Eating Habits',
      sweat: 'Sweating',
      temperature: 'Temperature Sensitivity',
      sleep: 'Sleep Habits',
      health: 'Health Issues',
      activity: 'Preferred Activities',
      emotion: 'Emotional Response'
    }
  },
  zh: {
    title: '四象体质自诊',
    subtitle: '基于韩医学四象体质论的体质评分诊断',
    selectOption: '请选择适用选项',
    resultTitle: '诊断结果',
    expectedConstitution: '预期体质',
    disclaimer: '※ 此结果仅供参考。更准确的诊断需要韩医学专家咨询。',
    restartButton: '重新诊断',
    incompleteTitle: '有未回答的问题',
    incompleteDesc: '请回答下面的问题。',
    confirmButton: '确认',
    categories: {
      physical: '身体特征',
      facial: '面部特征',
      personality: '性格',
      digestion: '消化及饮食习惯',
      sweat: '出汗',
      temperature: '温度敏感度',
      sleep: '睡眠习惯',
      health: '健康问题',
      activity: '偏好活动',
      emotion: '情绪反应'
    }
  },
  ja: {
    title: '四象体質自己診断',
    subtitle: '韓医学の四象体質論に基づく体質別スコア診断',
    selectOption: '該当する項目を選択してください',
    resultTitle: '診断結果',
    expectedConstitution: '予想体質',
    disclaimer: '※ この結果は参考用です。より正確な診断には韓医学専門家の相談が必要です。',
    restartButton: '再診断',
    incompleteTitle: '未回答の質問があります',
    incompleteDesc: '以下の質問に回答してください。',
    confirmButton: '確認',
    categories: {
      physical: '身体的特徴',
      facial: '顔の特徴',
      personality: '性格',
      digestion: '消化・食習慣',
      sweat: '発汗',
      temperature: '温度感受性',
      sleep: '睡眠習慣',
      health: '健康問題',
      activity: '好みの活動',
      emotion: '感情反応'
    }
  },
  ceb: {
    title: 'Sasang Constitution Self-Diagnosis',
    subtitle: 'Constitution-based scoring diagnosis base sa Korean medicine theory',
    selectOption: 'Palihog pilia ang applicable nga option',
    resultTitle: 'Diagnosis Result',
    expectedConstitution: 'Expected Constitution',
    disclaimer: '※ Kini nga resulta para ra sa reference. Para sa mas accurate nga diagnosis, consultation sa Korean medicine specialist ang gikinahanglan.',
    restartButton: 'Restart Diagnosis',
    incompleteTitle: 'Adunay wala matubag nga mga pangutana',
    incompleteDesc: 'Palihog tubaga ang mga pangutana sa ubos.',
    confirmButton: 'Confirm',
    categories: {
      physical: 'Physical Characteristics',
      facial: 'Facial Features',
      personality: 'Personality',
      digestion: 'Digestion & Eating Habits',
      sweat: 'Sweating',
      temperature: 'Temperature Sensitivity',
      sleep: 'Sleep Habits',
      health: 'Health Issues',
      activity: 'Preferred Activities',
      emotion: 'Emotional Response'
    }
  }
};

// 언어 옵션
const languageOptions = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ceb', name: 'Cebuano', flag: '🇵🇭' }
];

// 사상체질 설명 사전 정의
const constitutionExplanations = {
  태양인: {
    ko: {
      title: '태양인 (Taeyangin)',
      desc: [
        '신체적 특징: 상체가 발달하고 하체가 상대적으로 약함, 얼굴이 크고 이마가 넓음',
        '성격: 외향적이고 활동적, 리더십이 강함, 추진력이 있지만 참을성이 부족함',
        '건강: 간 기능이 강하고 폐 기능이 약함, 호흡기 질환에 취약',
        '생활습관: 새로운 것을 좋아하고 도전적, 경쟁심이 강함'
      ]
    },
    en: {
      title: 'Taeyangin (Greater Yang)',
      desc: [
        'Physical: Upper body developed, lower body relatively weak, large face with broad forehead',
        'Personality: Extroverted and active, strong leadership, driven but lacks patience',
        'Health: Strong liver function, weak lung function, vulnerable to respiratory diseases',
        'Lifestyle: Enjoys new things and challenges, competitive'
      ]
    },
    zh: {
      title: '太阳人 (Taeyangin)',
      desc: [
        '身体特征: 上半身发达，下半身相对较弱，脸大额头宽',
        '性格: 外向活跃，领导力强，有推动力但缺乏耐心',
        '健康: 肝功能强，肺功能弱，易患呼吸系统疾病',
        '生活习惯: 喜欢新事物和挑战，竞争心强'
      ]
    },
    ja: {
      title: '太陽人 (Taeyangin)',
      desc: [
        '身体的特徴: 上半身が発達し、下半身が比較的弱い、顔が大きく額が広い',
        '性格: 外向的で活動的、リーダーシップが強い、推進力があるが我慢強さが不足',
        '健康: 肝機能が強く、肺機能が弱い、呼吸器疾患に脆弱',
        '生活習慣: 新しいものを好み、挑戦的、競争心が強い'
      ]
    },
    ceb: {
      title: 'Taeyangin (Greater Yang)',
      desc: [
        'Physical: Upper body developed, lower body relatively weak, large face with broad forehead',
        'Personality: Extroverted and active, strong leadership, driven but lacks patience',
        'Health: Strong liver function, weak lung function, vulnerable to respiratory diseases',
        'Lifestyle: Enjoys new things and challenges, competitive'
      ]
    }
  },
  태음인: {
    ko: {
      title: '태음인 (Taeeumin)',
      desc: [
        '신체적 특징: 하체가 발달하고 상체가 상대적으로 약함, 체격이 크고 튼튼함',
        '성격: 인내심이 강하고 신중함, 느긋하고 안정적, 내성적이지만 책임감이 강함',
        '건강: 폐 기능이 강하고 간 기능이 약함, 비만 및 대사질환에 취약',
        '생활습관: 식욕이 좋고 소화가 잘 됨, 꾸준한 생활을 선호'
      ]
    },
    en: {
      title: 'Taeeumin (Greater Yin)',
      desc: [
        'Physical: Lower body developed, upper body relatively weak, large and sturdy build',
        'Personality: Patient and cautious, relaxed and stable, introverted but responsible',
        'Health: Strong lung function, weak liver function, vulnerable to obesity and metabolic disorders',
        'Lifestyle: Good appetite and digestion, prefers steady lifestyle'
      ]
    },
    zh: {
      title: '太阴人 (Taeeumin)',
      desc: [
        '身体特征: 下半身发达，上半身相对较弱，体格大而结实',
        '性格: 有耐心且谨慎，悠闲稳定，内向但有责任感',
        '健康: 肺功能强，肝功能弱，易患肥胖和代谢疾病',
        '生活习惯: 食欲好消化佳，喜欢稳定的生活'
      ]
    },
    ja: {
      title: '太陰人 (Taeeumin)',
      desc: [
        '身体的特徴: 下半身が発達し、上半身が比較的弱い、体格が大きく頑丈',
        '性格: 我慢強く慎重、のんびりして安定、内向的だが責任感が強い',
        '健康: 肺機能が強く、肝機能が弱い、肥満や代謝疾患に脆弱',
        '生活習慣: 食欲が良く消化が良い、着実な生活を好む'
      ]
    },
    ceb: {
      title: 'Taeeumin (Greater Yin)',
      desc: [
        'Physical: Lower body developed, upper body relatively weak, large and sturdy build',
        'Personality: Patient and cautious, relaxed and stable, introverted but responsible',
        'Health: Strong lung function, weak liver function, vulnerable to obesity and metabolic disorders',
        'Lifestyle: Good appetite and digestion, prefers steady lifestyle'
      ]
    }
  },
  소양인: {
    ko: {
      title: '소양인 (Soyangin)',
      desc: [
        '신체적 특징: 상체가 발달하고 하체가 약함, 몸집이 비교적 작고 마른 편',
        '성격: 급하고 적극적, 변화를 좋아함, 감정 기복이 심함',
        '건강: 비장 기능이 강하고 신장 기능이 약함, 소화기 질환에 취약',
        '생활습관: 활동적이고 외부 활동을 선호, 새로운 것에 관심 많음'
      ]
    },
    en: {
      title: 'Soyangin (Lesser Yang)',
      desc: [
        'Physical: Upper body developed, lower body weak, relatively small and thin build',
        'Personality: Impatient and active, likes change, emotional ups and downs',
        'Health: Strong spleen function, weak kidney function, vulnerable to digestive disorders',
        'Lifestyle: Active and prefers outdoor activities, interested in new things'
      ]
    },
    zh: {
      title: '少阳人 (Soyangin)',
      desc: [
        '身体特征: 上半身发达，下半身弱，体型相对较小且瘦',
        '性格: 急躁积极，喜欢变化，情绪起伏大',
        '健康: 脾功能强，肾功能弱，易患消化系统疾病',
        '生活习惯: 活跃且喜欢户外活动，对新事物感兴趣'
      ]
    },
    ja: {
      title: '少陽人 (Soyangin)',
      desc: [
        '身体的特徴: 上半身が発達し、下半身が弱い、体が比較的小さく痩せている',
        '性格: せっかちで積極的、変化を好む、感情の起伏が激しい',
        '健康: 脾機能が強く、腎機能が弱い、消化器疾患に脆弱',
        '生活習慣: 活動的で外での活動を好む、新しいものに興味が多い'
      ]
    },
    ceb: {
      title: 'Soyangin (Lesser Yang)',
      desc: [
        'Physical: Upper body developed, lower body weak, relatively small and thin build',
        'Personality: Impatient and active, likes change, emotional ups and downs',
        'Health: Strong spleen function, weak kidney function, vulnerable to digestive disorders',
        'Lifestyle: Active and prefers outdoor activities, interested in new things'
      ]
    }
  },
  소음인: {
    ko: {
      title: '소음인 (Soeumin)',
      desc: [
        '신체적 특징: 하체가 발달하고 상체가 약함, 체격이 작고 마른 편',
        '성격: 조용하고 내성적, 세심하고 신중함, 걱정이 많고 소심함',
        '건강: 신장 기능이 강하고 비장 기능이 약함, 소화불량 및 위장 질환에 취약',
        '생활습관: 규칙적인 생활을 선호, 실내 활동을 좋아함'
      ]
    },
    en: {
      title: 'Soeumin (Lesser Yin)',
      desc: [
        'Physical: Lower body developed, upper body weak, small and thin build',
        'Personality: Quiet and introverted, careful and cautious, worrisome and timid',
        'Health: Strong kidney function, weak spleen function, vulnerable to indigestion and stomach disorders',
        'Lifestyle: Prefers regular lifestyle, enjoys indoor activities'
      ]
    },
    zh: {
      title: '少阴人 (Soeumin)',
      desc: [
        '身体特征: 下半身发达，上半身弱，体型小且瘦',
        '性格: 安静内向，细心谨慎，多虑胆小',
        '健康: 肾功能强，脾功能弱，易患消化不良和胃部疾病',
        '生活习惯: 喜欢规律生活，享受室内活动'
      ]
    },
    ja: {
      title: '少陰人 (Soeumin)',
      desc: [
        '身体的特徴: 下半身が発達し、上半身が弱い、体格が小さく痩せている',
        '性格: 静かで内向的、細やかで慎重、心配性で臆病',
        '健康: 腎機能が強く、脾機能が弱い、消化不良や胃腸疾患に脆弱',
        '生活習慣: 規則正しい生活を好む、室内活動を楽しむ'
      ]
    },
    ceb: {
      title: 'Soeumin (Lesser Yin)',
      desc: [
        'Physical: Lower body developed, upper body weak, small and thin build',
        'Personality: Quiet and introverted, careful and cautious, worrisome and timid',
        'Health: Strong kidney function, weak spleen function, vulnerable to indigestion and stomach disorders',
        'Lifestyle: Prefers regular lifestyle, enjoys indoor activities'
      ]
    }
  },
  모호: {
    ko: {
      title: '분류 불가(혼합형)',
      desc: [
        '문진 결과로 뚜렷한 체질을 특정하기 어려움.',
        '추가 상담 또는 전문 한의사 진단 권장.'
      ]
    },
    en: {
      title: 'Unclassifiable (Mixed Type)',
      desc: [
        'Unable to determine a clear constitution from the questionnaire results.',
        'Additional consultation or professional Korean medicine diagnosis recommended.'
      ]
    },
    zh: {
      title: '无法分类(混合型)',
      desc: [
        '根据问诊结果难以确定明确的体质。',
        '建议额外咨询或专业韩医诊断。'
      ]
    },
    ja: {
      title: '分類不可(混合型)',
      desc: [
        '問診結果で明確な体質を特定することが困難。',
        '追加相談または専門韓医師診断を推奨。'
      ]
    },
    ceb: {
      title: 'Unclassifiable (Mixed Type)',
      desc: [
        'Unable to determine a clear constitution from the questionnaire results.',
        'Additional consultation or professional Korean medicine diagnosis recommended.'
      ]
    }
  }
};

// 문진 카테고리 및 답변 구성
const questions = [
  {
    id: 1,
    category: 'physical',
    ko: '신체적 특징을 고르세요',
    en: 'Choose your physical characteristics',
    zh: '选择您的身体特征',
    ja: '身体的特徴を選んでください',
    ceb: 'Pilia ang imong physical characteristics',
    options: [
      { ko: '상체가 하체보다 더 발달했다', en: 'Upper body is more developed than lower body', zh: '上半身比下半身更发达', ja: '上半身が下半身より発達している', ceb: 'Upper body is more developed than lower body', constitution: '태양인' },
      { ko: '하체가 상체보다 더 발달했다', en: 'Lower body is more developed than upper body', zh: '下半身比上半身更发达', ja: '下半身が上半身より発達している', ceb: 'Lower body is more developed than upper body', constitution: '태음인' },
      { ko: '전체적으로 몸이 마른 편이다', en: 'Generally thin body type', zh: '整体偏瘦', ja: '全体的に痩せている', ceb: 'Generally thin body type', constitution: '소음인' },
      { ko: '전체적으로 체격이 튼튼하다', en: 'Generally sturdy build', zh: '整体体格结实', ja: '全体的に体格が頑丈', ceb: 'Generally sturdy build', constitution: '태음인' }
    ]
  },
  {
    id: 2,
    category: 'facial',
    ko: '얼굴 특징을 고르세요',
    en: 'Choose your facial features',
    zh: '选择您的面部特征',
    ja: '顔の特徴を選んでください',
    ceb: 'Pilia ang imong facial features',
    options: [
      { ko: '얼굴이 크고 이마가 넓다', en: 'Large face with broad forehead', zh: '脸大额头宽', ja: '顔が大きく額が広い', ceb: 'Large face with broad forehead', constitution: '태양인' },
      { ko: '얼굴이 길고 좁다', en: 'Long and narrow face', zh: '脸长且窄', ja: '顔が長く細い', ceb: 'Long and narrow face', constitution: '소음인' },
      { ko: '볼이 통통하고 둥글다', en: 'Chubby and round cheeks', zh: '脸颊丰满圆润', ja: '頬がぷくぷくして丸い', ceb: 'Chubby and round cheeks', constitution: '태음인' },
      { ko: '턱선이 날카롭고 뚜렷하다', en: 'Sharp and prominent jawline', zh: '下颌线尖锐明显', ja: '顎のラインが鋭くはっきりしている', ceb: 'Sharp and prominent jawline', constitution: '소양인' }
    ]
  },
  {
    id: 3,
    category: 'personality',
    ko: '성격을 고르세요',
    en: 'Choose your personality',
    zh: '选择您的性格',
    ja: '性格を選んでください',
    ceb: 'Pilia ang imong personality',
    options: [
      { ko: '외향적이고 사교적이다', en: 'Extroverted and sociable', zh: '外向且善于社交', ja: '外向的で社交的', ceb: 'Extroverted and sociable', constitution: '소양인' },
      { ko: '신중하고 꼼꼼하다', en: 'Cautious and meticulous', zh: '谨慎且细心', ja: '慎重で几帳面', ceb: 'Cautious and meticulous', constitution: '소음인' },
      { ko: '성격이 급하지만 금방 풀린다', en: 'Impatient but quick to calm down', zh: '性格急躁但很快平静', ja: 'せっかちだがすぐに収まる', ceb: 'Impatient but quick to calm down', constitution: '소양인' },
      { ko: '차분하고 인내심이 많다', en: 'Calm and patient', zh: '冷静且有耐心', ja: '落ち着いていて我慢強い', ceb: 'Calm and patient', constitution: '태음인' }
    ]
  },
  {
    id: 4,
    category: 'digestion',
    ko: '소화 및 식습관을 고르세요',
    en: 'Choose your digestion and eating habits',
    zh: '选择您的消化和饮食习惯',
    ja: '消化・食習慣を選んでください',
    ceb: 'Pilia ang imong digestion ug eating habits',
    options: [
      { ko: '식욕이 좋고 소화가 잘 된다', en: 'Good appetite and digestion', zh: '食欲好消化佳', ja: '食欲が良く消化が良い', ceb: 'Good appetite and digestion', constitution: '태음인' },
      { ko: '자주 소화가 안 되거나 식욕이 약하다', en: 'Often have poor digestion or weak appetite', zh: '经常消化不良或食欲不振', ja: 'よく消化不良や食欲不振', ceb: 'Often have poor digestion or weak appetite', constitution: '소음인' },
      { ko: '따뜻한 음식을 선호한다', en: 'Prefer warm foods', zh: '偏好温热食物', ja: '温かい食べ物を好む', ceb: 'Prefer warm foods', constitution: '소음인' },
      { ko: '차가운 음식을 선호한다', en: 'Prefer cold foods', zh: '偏好冷食', ja: '冷たい食べ物を好む', ceb: 'Prefer cold foods', constitution: '소양인' }
    ]
  },
  {
    id: 5,
    category: 'sweat',
    ko: '땀에 대해 고르세요',
    en: 'Choose about sweating',
    zh: '选择关于出汗',
    ja: '発汗について選んでください',
    ceb: 'Pilia bahin sa sweating',
    options: [
      { ko: '조금만 움직여도 땀이 많이 난다', en: 'Sweat a lot even with little movement', zh: '稍微动一下就出很多汗', ja: '少し動くだけでたくさん汗をかく', ceb: 'Sweat a lot even with little movement', constitution: '태음인' },
      { ko: '활동적으로 움직여도 땀이 잘 나지 않는다', en: 'Don\'t sweat much even with active movement', zh: '即使积极活动也不容易出汗', ja: '活発に動いてもあまり汗をかかない', ceb: 'Don\'t sweat much even with active movement', constitution: '소음인' }
    ]
  },
  {
    id: 6,
    category: 'temperature',
    ko: '온도 민감도를 고르세요',
    en: 'Choose your temperature sensitivity',
    zh: '选择您的温度敏感度',
    ja: '温度感受性を選んでください',
    ceb: 'Pilia ang imong temperature sensitivity',
    options: [
      { ko: '추운 날씨에 민감하다', en: 'Sensitive to cold weather', zh: '对寒冷天气敏感', ja: '寒い天気に敏感', ceb: 'Sensitive to cold weather', constitution: '소음인' },
      { ko: '더운 날씨에 민감하다', en: 'Sensitive to hot weather', zh: '对炎热天气敏感', ja: '暑い天気に敏感', ceb: 'Sensitive to hot weather', constitution: '소양인' }
    ]
  },
  {
    id: 7,
    category: 'sleep',
    ko: '수면 습관을 고르세요',
    en: 'Choose your sleep habits',
    zh: '选择您的睡眠习惯',
    ja: '睡眠習慣を選んでください',
    ceb: 'Pilia ang imong sleep habits',
    options: [
      { ko: '쉽게 잠들고 깊게 잔다', en: 'Fall asleep easily and sleep deeply', zh: '容易入睡且睡眠深', ja: '寝つきが良く深く眠る', ceb: 'Fall asleep easily and sleep deeply', constitution: '태음인' },
      { ko: '잠들기 어렵거나 자주 깨는 편이다', en: 'Have difficulty falling asleep or wake up frequently', zh: '难以入睡或经常醒来', ja: '寝つきが悪いかよく目が覚める', ceb: 'Have difficulty falling asleep or wake up frequently', constitution: '태양인' }
    ]
  },
  {
    id: 8,
    category: 'health',
    ko: '건강 문제를 고르세요',
    en: 'Choose your health issues',
    zh: '选择您的健康问题',
    ja: '健康問題を選んでください',
    ceb: 'Pilia ang imong health issues',
    options: [
      { ko: '호흡기 문제(기침, 천식 등)가 자주 있다', en: 'Often have respiratory problems (cough, asthma, etc.)', zh: '经常有呼吸系统问题(咳嗽、哮喘等)', ja: 'よく呼吸器の問題（咳、喘息など）がある', ceb: 'Often have respiratory problems (cough, asthma, etc.)', constitution: '태양인' },
      { ko: '소화 문제(복통, 설사 등)가 자주 있다', en: 'Often have digestive problems (stomach pain, diarrhea, etc.)', zh: '经常有消化问题(腹痛、腹泻等)', ja: 'よく消化の問題（腹痛、下痢など）がある', ceb: 'Often have digestive problems (stomach pain, diarrhea, etc.)', constitution: '소양인' },
      { ko: '소변이나 변비 등 배설 문제를 자주 겪는다', en: 'Often experience excretion problems like frequent urination or constipation', zh: '经常遇到排尿或便秘等排泄问题', ja: 'よく頻尿や便秘などの排泄の問題がある', ceb: 'Often experience excretion problems like frequent urination or constipation', constitution: '소음인' }
    ]
  },
  {
    id: 9,
    category: 'activity',
    ko: '선호 활동을 고르세요',
    en: 'Choose your preferred activities',
    zh: '选择您偏好的活动',
    ja: '好みの活動を選んでください',
    ceb: 'Pilia ang imong preferred activities',
    options: [
      { ko: '야외활동과 운동을 선호한다', en: 'Prefer outdoor activities and exercise', zh: '偏好户外活动和运动', ja: '野外活動や運動を好む', ceb: 'Prefer outdoor activities and exercise', constitution: '소양인' },
      { ko: '조용한 실내활동을 선호한다', en: 'Prefer quiet indoor activities', zh: '偏好安静的室内活动', ja: '静かな室内活動を好む', ceb: 'Prefer quiet indoor activities', constitution: '소음인' }
    ]
  },
  {
    id: 10,
    category: 'emotion',
    ko: '감정 반응을 고르세요',
    en: 'Choose your emotional response',
    zh: '选择您的情感反应',
    ja: '感情反応を選んでください',
    ceb: 'Pilia ang imong emotional response',
    options: [
      { ko: '쉽게 화내지만 금방 가라앉는다', en: 'Get angry easily but calm down quickly', zh: '容易生气但很快平静', ja: 'すぐに怒るがすぐに収まる', ceb: 'Get angry easily but calm down quickly', constitution: '소양인' },
      { ko: '걱정이 많고 스트레스를 쉽게 받는다', en: 'Worry a lot and easily stressed', zh: '多虑且容易有压力', ja: '心配事が多くストレスを受けやすい', ceb: 'Worry a lot and easily stressed', constitution: '소음인' }
    ]
  }
];

// 체질별 개수 계산 및 결과 판정
function calculateConstitution(answers: Record<number, string>) {
  const counts = {
    태양인: 0,
    태음인: 0,
    소양인: 0,
    소음인: 0
  };

  // 각 문진에서 선택한 답변의 체질을 카운트
  questions.forEach(q => {
    const selectedOption = answers[q.id];
    if (selectedOption) {
      const option = q.options.find(opt => opt.ko === selectedOption || opt.en === selectedOption || opt.zh === selectedOption || opt.ja === selectedOption || opt.ceb === selectedOption);
      if (option) {
        counts[option.constitution as keyof typeof counts]++;
      }
    }
  });

  // 가장 많이 나온 체질 찾기
  const maxCount = Math.max(...Object.values(counts));
  const maxConstitutions = Object.entries(counts)
    .filter(([, count]) => count === maxCount)
    .map(([constitution]) => constitution);

  // 동점인 경우 모호로 판정
  if (maxConstitutions.length > 1 || maxCount === 0) {
    return { constitution: '모호', counts };
  }

  return { constitution: maxConstitutions[0], counts };
}

export default function SasangDiagnosis() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  // 브라우저 언어 감지 함수
  const detectBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.languages?.[0] || 'ko';
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    // 지원하는 언어 목록
    const supportedLanguages = ['ko', 'en', 'zh', 'ja', 'ceb'];
    
    // 브라우저 언어가 지원되는 언어인지 확인
    if (supportedLanguages.includes(langCode)) {
      return langCode;
    }
    
    // 중국어의 경우 zh-CN, zh-TW 등을 zh로 매핑
    if (langCode === 'zh') {
      return 'zh';
    }
    
    // 기본값은 한국어
    return 'ko';
  };

  const [currentLanguage, setCurrentLanguage] = useState(detectBrowserLanguage);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showAnnPopup, setShowAnnPopup] = useState(false);

  const t = translations[currentLanguage as keyof typeof translations];

  const handleAnswer = (id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    
    // 답변 선택 시 다음 문진으로 자동 이동
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setSlideDirection('left');
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setSlideDirection(null);
        }, 400);
      }
    }, 600);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setSlideDirection('right');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setSlideDirection(null);
      }, 400);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 답하지 않은 문진 확인
    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    
    if (unansweredQuestions.length > 0) {
      setShowIncompleteModal(true);
      return;
    }
    
    // Ann 팝업 표시
    setShowAnnPopup(true);
    
    // 3초 후 팝업 닫고 결과 표시
    setTimeout(() => {
      setShowAnnPopup(false);
      setSubmitted(true);
    }, 3000);
  };

  // 체질별 개수 계산
  const { constitution } = calculateConstitution(answers);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  // 답하지 않은 문진 목록
  const unansweredQuestions = questions.filter(q => !answers[q.id]);
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 text-center relative">
          {/* Language Selector */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <span className="text-lg">🌐</span>
            </button>
            {showLanguageMenu && (
              <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg p-2 min-w-48 z-50">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                      currentLanguage === lang.code ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t.title}</h1>
          <p className="text-xl opacity-90 font-light">{t.subtitle}</p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {!submitted ? (
            <div className="relative">
              {/* 이전 버튼 */}
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="absolute top-4 left-4 z-10 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Question Counter */}
              <div className="text-center mb-8">
                <span className="text-lg font-medium text-gray-600">
                  {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>

              {/* Current Question */}
              <div
                className={`card ${
                  slideDirection === 'right' ? 'slide-out-right' :
                  slideDirection === 'left' ? 'slide-out-left' :
                  'slide-in'
                }`}
              >
                <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-blue-500">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-medium text-gray-600 mb-2">{t.selectOption}</h3>
                    <div className="text-2xl font-bold text-gray-800 mb-4">
                      {currentQuestion[currentLanguage as keyof typeof currentQuestion] as string}
                    </div>
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {t.categories[currentQuestion.category as keyof typeof t.categories]}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <label key={index} className="flex items-center cursor-pointer p-4 rounded-xl hover:bg-blue-50 transition-colors border border-gray-200">
                        <input
                          type="radio"
                          name={`q${currentQuestion.id}`}
                          value={option[currentLanguage as keyof typeof option]}
                          checked={answers[currentQuestion.id] === option[currentLanguage as keyof typeof option]}
                          onChange={() => handleAnswer(currentQuestion.id, option[currentLanguage as keyof typeof option])}
                          className="mr-3 scale-125"
                        />
                        <span className="text-sm font-medium">{option[currentLanguage as keyof typeof option]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              {answeredCount === questions.length && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    {currentLanguage === 'ko' ? '결과 확인하기' : 
                     currentLanguage === 'en' ? 'Check Results' :
                     currentLanguage === 'zh' ? '查看结果' :
                     currentLanguage === 'ja' ? '結果を確認' :
                     'Check Results'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results */
            <div className="bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-3xl p-8 text-center">
              <h3 className="text-3xl font-bold mb-6">{t.resultTitle}</h3>
              
              {/* Constitution Result */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-2xl font-bold mb-4">
                  {t.expectedConstitution}: {constitutionExplanations[constitution as keyof typeof constitutionExplanations][currentLanguage as keyof typeof constitutionExplanations.태양인].title}
                </div>
                <ul className="text-left space-y-2">
                  {constitutionExplanations[constitution as keyof typeof constitutionExplanations][currentLanguage as keyof typeof constitutionExplanations.태양인].desc.map((d, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-yellow-300 font-bold mr-3">•</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-6 text-sm opacity-90">
                {t.disclaimer}
              </div>

              {/* 다시 시작 버튼 */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setAnswers({});
                    setCurrentQuestionIndex(0);
                    setSubmitted(false);
                    setSlideDirection(null);
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-white/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {t.restartButton}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 미완성 문진 알림 모달 */}
      {showIncompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.incompleteTitle}</h3>
              <p className="text-gray-600">{t.incompleteDesc}</p>
            </div>
            
            <div className="space-y-3 mb-6">
              {unansweredQuestions.map((q) => (
                <div key={q.id} className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                                          <div className="text-gray-800 font-medium">
                        {q[currentLanguage as keyof typeof q] as string}
                      </div>
                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full ml-2">
                      {t.categories[q.category as keyof typeof t.categories]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setShowIncompleteModal(false)}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                {t.confirmButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ann 토스트 메시지 */}
      {showAnnPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-black bg-opacity-80 text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium animate-fade-in">
            💝 This program was developed at Ann&apos;s request.
          </div>
        </div>
      )}
    </div>
  );
}