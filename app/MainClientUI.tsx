"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// 서울(25구), 경기(31시·군), 인천(11구·군) 전지역 세부 데이터
const regionData: Record<
  string,
  { name: string; districts: Record<string, { name: string; dongs: string[] }> }
> = {
  seoul: {
    name: "서울특별시",
    districts: {
      jongno: { name: "종로구", dongs: ["청운동", "효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "종로1.2.3.4가동", "종로5.6가동", "이화동", "혜화동", "창신1동", "창신2동", "창신3동", "숭인1동", "숭인2동"] },
      jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "동화동", "황학동", "중림동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "용산2가동", "남영동", "청파동", "원효로1동", "원효로2동", "효창동", "용문동", "이촌1동", "이촌2동", "이태원1동", "이태원2동", "한남동", "서빙고동", "보광동"] },
      seongdong: { name: "성동구", dongs: ["왕십리2동", "왕십리도선동", "마장동", "사근동", "행당1동", "행당2동", "응봉동", "금호1가동", "금호2.3가동", "금호4가동", "옥수동", "성수1가1동", "성수1가2동", "성수2가1동", "성수2가3동", "송정동", "용답동"] },
      gwangjin: { name: "광진구", dongs: ["중곡1동", "중곡2동", "중곡3동", "중곡4동", "능동", "구의1동", "구의2동", "구의3동", "광장동", "자양1동", "자양2동", "자양3동", "자양4동", "화양동", "군자동"] },
      dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농1동", "전농2동", "답십리1동", "답십리2동", "장안1동", "장안2동", "청량리동", "회기동", "휘경1동", "휘경2동", "이문1동", "이문2동"] },
      jungnang: { name: "중랑구", dongs: ["면목본동", "면목2동", "면목3.4동", "면목5동", "면목7동", "상봉1동", "상봉2동", "중화1동", "중화2동", "묵1동", "묵2동", "망우본동", "망우3동", "신내1동", "신내2동"] },
      seongbuk: { name: "성북구", dongs: ["성북동", "삼선동", "동선동", "돈암1동", "돈암2동", "안암동", "보문동", "정릉1동", "정릉2동", "정릉3동", "정릉4동", "길음1동", "길음2동", "종암동", "월곡1동", "월곡2동", "장위1동", "장위2동", "장위3동", "석관동"] },
      gangbuk: { name: "강북구", dongs: ["삼양동", "미아동", "송중동", "송천동", "삼각산동", "번1동", "번2동", "번3동", "수유1동", "수유2동", "수유3동", "우이동", "인수동"] },
      dobong: { name: "도봉구", dongs: ["창1동", "창2동", "창3동", "창4동", "창5동", "도봉1동", "도봉2동", "쌍문1동", "쌍문2동", "쌍문3동", "쌍문4동", "방학1동", "방학2동", "방학3동"] },
      nowon: { name: "노원구", dongs: ["상계1동", "상계2동", "상계3.4동", "상계5동", "상계6.7동", "상계8동", "상계9동", "상계10동", "중계본동", "중계1동", "중계2.3동", "중계4동", "하계1동", "하계2동", "공릉1동", "공릉2동"] },
      eunpyeong: { name: "은평구", dongs: ["불광1동", "불광2동", "갈현1동", "갈현2동", "구산동", "대조동", "응암1동", "응암2동", "응암3동", "역촌동", "신사1동", "신사2동", "증산동", "수색동", "진관동"] },
      seodaemun: { name: "서대문구", dongs: ["천연동", "북아현동", "충현동", "신촌동", "연희동", "홍제1동", "홍제2동", "홍제3동", "홍은1동", "홍은2동", "남가좌1동", "남가좌2동", "북가좌1동", "북가좌2동"] },
      mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "신수동", "서교동", "합정동", "망원1동", "망원2동", "연남동", "성산1동", "성산2동", "상암동"] },
      yangcheon: { name: "양천구", dongs: ["목1동", "목2동", "목3동", "목4동", "목5동", "신월1동", "신월2동", "신월3동", "신월4동", "신월5동", "신월6동", "신월7동", "신정1동", "신정2동", "신정3동", "신정4동", "신정6동", "신정7동"] },
      gangseo: { name: "강서구", dongs: ["등촌1동", "등촌2동", "등촌3동", "화곡본동", "화곡1동", "화곡2동", "화곡3동", "화곡4동", "화곡6동", "화곡8동", "우장산동", "가양1동", "가양2동", "가양3동", "발산1동", "공항동", "방화1동", "방화2동", "방화3동"] },
      guro: { name: "구로구", dongs: ["신도림동", "구로1동", "구로2동", "구로3동", "구로4동", "구로5동", "가리봉동", "고척1동", "고척2동", "개봉1동", "개봉2동", "개봉3동", "오류1동", "오류2동", "수궁동", "항동"] },
      geumcheon: { name: "금천구", dongs: ["가산동", "독산1동", "독산2동", "독산3동", "독산4동", "시흥1동", "시흥2동", "시흥3동", "시흥4동", "시흥5동"] },
      yeongdeungpo: { name: "영등포구", dongs: ["영등포본동", "영등포동", "여의동", "당산1동", "당산2동", "도림동", "문래동", "양평1동", "양평2동", "신길1동", "신길3동", "신길4동", "신길5동", "신길6동", "신길7동", "대림1동", "대림2동", "대림3동"] },
      dongjak: { name: "동작구", dongs: ["노량진1동", "노량진2동", "상도1동", "상도2동", "상도3동", "상도4동", "흑석동", "사당1동", "사당2동", "사당3동", "사당4동", "사당5동", "대방동", "신대방1동", "신대방2동"] },
      gwanak: { name: "관악구", dongs: ["보라매동", "청림동", "성현동", "행운동", "낙성대동", "청룡동", "은천동", "상현동", "서원동", "신원동", "서림동", "신사동", "난향동", "조원동", "대학동", "난곡동", "삼성동", "미성동"] },
      seocho: { name: "서초구", dongs: ["서초1동", "서초2동", "서초3동", "서초4동", "잠원동", "반포본동", "반포1동", "반포2동", "반포3동", "반포4동", "방배본동", "방배1동", "방배2동", "방배3동", "방배4동", "양재1동", "양재2동", "내곡동"] },
      gangnam: { name: "강남구", dongs: ["역삼1동", "역삼2동", "개포1동", "개포2동", "개포4동", "청담동", "삼성1동", "삼성2동", "대치1동", "대치2동", "대치4동", "신사동", "논현1동", "논현2동", "압구정동", "세곡동", "자곡동", "일원동", "수서동", "도곡1동", "도곡2동"] },
      songpa: { name: "송파구", dongs: ["잠실본동", "잠실2동", "잠실3동", "잠실4동", "잠실6동", "잠실7동", "풍납1동", "풍납2동", "거여1동", "거여2동", "마천1동", "마천2동", "방이1동", "방이2동", "오륜동", "오금동", "송파1동", "송파2동", "석촌동", "삼전동", "가락본동", "가락1동", "가락2동", "문정1동", "문정2동", "장지동", "위례동", "잠실동"] },
      gangdong: { name: "강동구", dongs: ["강일동", "상일1동", "상일2동", "명일1동", "명일2동", "고덕1동", "고덕2동", "암사1동", "암사2동", "암사3동", "천호1동", "천호2동", "천호3동", "성내1동", "성내2동", "성내3동", "둔촌1동", "둔촌2동"] },
    }
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon_jangan: { name: "수원시 장안구", dongs: ["파장동", "정자1동", "정자2동", "정자3동", "영화동", "송죽동", "조원1동", "조원2동", "연무동", "율천동"] },
      suwon_gwonseon: { name: "수원시 권선구", dongs: ["세류1동", "세류2동", "세류3동", "평동", "서둔동", "구운동", "금곡동", "호매실동", "권선1동", "권선2동", "곡선동", "입북동"] },
      suwon_paldal: { name: "수원시 팔달구", dongs: ["행궁동", "매교동", "매산동", "고등동", "화서1동", "화서2동", "지동", "우만1동", "우만2동", "인계동"] },
      suwon_yeongtong: { name: "수원시 영통구", dongs: ["매탄1동", "매탄2동", "매탄3동", "매탄4동", "원천동", "영통1동", "영통2동", "영통3동", "망포1동", "망포2동", "광교1동", "광교2동"] },
      seongnam_sujeong: { name: "성남시 수정구", dongs: ["신흥1동", "신흥2동", "신흥3동", "태평1동", "태평2동", "태평3동", "태평4동", "수진1동", "수진2동", "단대동", "산성동", "양지동", "복정동", "위례동", "신촌동", "고등동", "시흥동"] },
      seongnam_jungwon: { name: "성남시 중원구", dongs: ["성남동", "중앙동", "금광1동", "금광2동", "은행1동", "은행2동", "상대원1동", "상대원2동", "상대원3동", "하대원동", "도촌동"] },
      seongnam_bundang: { name: "성남시 분당구", dongs: ["분당동", "수내1동", "수내2동", "수내3동", "정자동", "정자1동", "정자2동", "정자3동", "서현1동", "서현2동", "이매1동", "이매2동", "야탑1동", "야탑2동", "야탑3동", "금곡동", "구미동", "구미1동", "판교동", "삼평동", "백현동", "운중동"] },
      goyang_deogyang: { name: "고양시 덕양구", dongs: ["주교동", "원신동", "흥도동", "성사1동", "성사2동", "효자동", "삼송1동", "삼송2동", "창릉동", "능곡동", "행주동", "행신1동", "행신2동", "행신3동", "행신4동", "화정1동", "화정2동", "대덕동", "고양동", "관산동"] },
      goyang_ilsandong: { name: "고양시 일산동구", dongs: ["식사동", "중산1동", "중산2동", "정발산동", "풍산동", "백석1동", "백석2동", "마두1동", "마두2동", "장항1동", "장항2동", "고봉동"] },
      goyang_ilsanseo: { name: "고양시 일산서구", dongs: ["일산1동", "일산2동", "일산3동", "탄현1동", "탄현2동", "주엽1동", "주엽2동", "대화동", "송포동", "덕이동", "가좌동"] },
      yongin_cheoin: { name: "용인시 처인구", dongs: ["포곡읍", "모현읍", "이동읍", "남사읍", "원삼면", "백암면", "양지면", "중앙동", "역북동", "삼가동", "유림동", "동부동"] },
      yongin_giheung: { name: "용인시 기흥구", dongs: ["신갈동", "영덕1동", "영덕2동", "구갈동", "상갈동", "보라동", "기흥동", "서농동", "구성동", "마북동", "동백1동", "동백2동", "동백3동", "상하동", "보정동"] },
      yongin_suji: { name: "용인시 수지구", dongs: ["풍덕천1동", "풍덕천2동", "신봉동", "죽전1동", "죽전2동", "죽전3동", "동천동", "상현1동", "상현2동", "상현3동", "성복동"] },
      bucheon_wonmi: { name: "부천시 원미구", dongs: ["심곡1동", "심곡2동", "심곡3동", "원미1동", "원미2동", "소사동", "역곡1동", "역곡2동", "춘의동", "도당동", "약대동", "중동", "중1동", "중2동", "중3동", "중4동", "상동", "상1동", "상2동", "상3동"] },
      bucheon_sosa: { name: "부천시 소사구", dongs: ["심곡본동", "심곡본1동", "소사본동", "소사본1동", "범박동", "옥길동", "괴안동", "송내1동", "송내2동"] },
      bucheon_ojeong: { name: "부천시 오정구", dongs: ["성곡동", "원종1동", "원종2동", "고강본동", "고강1동", "오정동", "신흥동"] },
      ansan_sangnok: { name: "안산시 상록구", dongs: ["일동", "이동", "사동", "사이동", "해양동", "본오1동", "본오2동", "본오3동", "부곡동", "월피동", "성포동", "반월동", "안산동"] },
      ansan_danwon: { name: "안산시 단원구", dongs: ["와동", "고잔동", "중앙동", "호수동", "원곡동", "백운동", "신길동", "초지동", "선부1동", "선부2동", "선부3동", "대부동"] },
      anyang_manan: { name: "안양시 만안구", dongs: ["안양1동", "안양2동", "안양3동", "안양4동", "안양5동", "안양6동", "안양7동", "안양8동", "안양9동", "석수1동", "석수2동", "석수3동", "박달1동", "박달2동"] },
      anyang_dongan: { name: "안양시 동안구", dongs: ["비산1동", "비산2동", "비산3동", "부흥동", "달안동", "관양1동", "관양2동", "부림동", "평촌동", "평안동", "귀인동", "호계1동", "호계2동", "호계3동", "범계동", "신촌동", "갈산동"] },
      namyangju: { name: "남양주시", dongs: ["와부읍", "진접읍", "화도읍", "진건읍", "오남읍", "별내면", "수동면", "조안면", "퇴계원읍", "호평동", "평내동", "금곡동", "양정동", "다산1동", "다산2동", "별내동"] },
      hwaseong: { name: "화성시", dongs: ["봉담읍", "우정읍", "향남읍", "남양읍", "매송면", "비봉면", "마도면", "송산면", "서신면", "팔탄면", "장안면", "양감면", "정남면", "새솔동", "진안동", "병점1동", "병점2동", "반월동", "기배동", "화산동", "동탄1동", "동탄2동", "동탄3동", "동탄4동", "동탄5동", "동탄6동", "동탄7동", "동탄8동", "동탄9동"] },
      pyeongtaek: { name: "평택시", dongs: ["팽성읍", "안중읍", "포승읍", "청북읍", "진위면", "서탄면", "고덕면", "오성면", "현덕면", "중앙동", "서정동", "송탄동", "지산동", "송북동", "신장1동", "신장2동", "신평동", "원평동", "통복동", "비전1동", "비전2동", "용이동", "동삭동", "세교동", "고덕동"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부1동", "의정부2동", "호원1동", "호원2동", "장암동", "신곡1동", "신곡2동", "송산1동", "송산2동", "송산3동", "자금동", "가능동", "흥선동", "녹양동"] },
      paju: { name: "파주시", dongs: ["문산읍", "조리읍", "법원읍", "파주읍", "광탄면", "탄현면", "월롱면", "적성면", "파평면", "장단면", "교하동", "운정1동", "운정2동", "운정3동", "운정4동", "운정5동", "운정6동", "금촌1동", "금촌2동", "금촌3동"] },
      gimpo: { name: "김포시", dongs: ["통진읍", "고촌읍", "양촌읍", "대곶면", "월곶면", "하성면", "김포본동", "장기본동", "사우동", "풍무동", "장기동", "구래동", "마산동", "운양동"] },
      siheung: { name: "시흥시", dongs: ["대야동", "신천동", "신현동", "은행동", "매화동", "목감동", "군자동", "월곶동", "정왕본동", "정왕1동", "정왕2동", "정왕3동", "정왕4동", "배곧1동", "배곧2동", "과림동", "연성동", "장곡동", "능곡동", "거모동"] },
      gwangmyeong: { name: "광명시", dongs: ["광명1동", "광명2동", "광명3동", "광명4동", "광명5동", "광명6동", "광명7동", "철산1동", "철산2동", "철산3동", "철산4동", "하안1동", "하안2동", "하안3동", "하안4동", "소하1동", "소하2동", "일직동", "학온동"] },
      gwangju: { name: "광주시", dongs: ["오포1동", "오포2동", "신현동", "능평동", "초월읍", "곤지암읍", "도척면", "퇴촌면", "남종면", "남한산성면", "경안동", "쌍령동", "송정동", "탄벌동", "광남1동", "광남2동"] },
      hanam: { name: "하남시", dongs: ["천현동", "신장1동", "신장2동", "덕풍1동", "덕풍2동", "덕풍3동", "풍산동", "미사1동", "미사2동", "미사3동", "감북동", "감일동", "위례동", "춘궁동", "초이동"] },
      gunpo: { name: "군포시", dongs: ["군포1동", "군포2동", "산본1동", "산본2동", "금정동", "재궁동", "오금동", "수리동", "궁내동", "대야동", "송부동"] },
      osan: { name: "오산시", dongs: ["중앙동", "남촌동", "신장1동", "신장2동", "세마동", "초평동", "대원1동", "대원2동"] },
      icheon: { name: "이천시", dongs: ["장호원읍", "부발읍", "신둔면", "백사면", "호법면", "마장면", "대월면", "모가면", "설성면", "율면", "창전동", "증포동", "중리동", "관고동"] },
      anseong: { name: "안성시", dongs: ["공도읍", "보개면", "금광면", "서운면", "미양면", "대덕면", "양성면", "원곡면", "일죽면", "죽산면", "삼죽면", "고삼면", "안성1동", "안성2동", "안성3동"] },
      yangju: { name: "양주시", dongs: ["백석읍", "은현면", "남면", "광적면", "장흥면", "양주1동", "양주2동", "회천1동", "회천2동", "회천3동", "옥정1동", "옥정2동"] },
      pochon: { name: "포천시", dongs: ["소흘읍", "군내면", "내촌면", "가산면", "신북면", "창수면", "영중면", "일동면", "이동면", "영북면", "관인면", "화현면", "포천동", "선단동"] },
      yeoju: { name: "여주시", dongs: ["가남읍", "점동면", "흥천면", "금사면", "산북면", "대신면", "북내면", "강천면", "여흥동", "중앙동", "오학동"] },
      dongducheon: { name: "동두천시", dongs: ["생연1동", "생연2동", "중앙동", "보산동", "불현동", "송내동", "소요동", "상패동"] },
      gapyeong: { name: "가평군", dongs: ["가평읍", "설악면", "청평면", "상면", "조종면", "북면"] },
      yangpyeong: { name: "양평군", dongs: ["양평읍", "강상면", "강하면", "양서면", "옥천면", "서종면", "단월면", "청운면", "양동면", "지평면", "용문면", "개군면"] },
      yeoncheon: { name: "연천군", dongs: ["연천읍", "전곡읍", "군남면", "청산면", "백학면", "미산면", "왕징면", "신서면", "중면", "장남면"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      jemulpo: {
        name: "제물포구",
        dongs: [
          "신포동", "연안동", "신흥동", "도원동", "율목동", "동인천동", "개항동",
          "만석동", "화수1.화평동", "화수2동", "송현1.2동", "송현3동", "송림1동", "송림2동", "송림3.5동", "송림4동", "송림6동", "금창동"
        ]
      },
      yeongjong: {
        name: "영종구",
        dongs: ["영종동", "영종1동", "영종2동", "운서동", "용유동"]
      },
      michuhol: {
        name: "미추홀구",
        dongs: ["숭의1.4동", "숭의2동", "숭의3동", "용현1.4동", "용현2동", "용현3동", "용현5동", "학익1동", "학익2동", "도화1동", "도화2.3동", "주안1동", "주안2동", "주안3동", "주안4동", "주안5동", "주안6동", "주안7동", "주안8동", "관교동", "문학동"]
      },
      yeonsu: {
        name: "연수구",
        dongs: ["옥련1동", "옥련2동", "선학동", "연수1동", "연수2동", "연수3동", "청학동", "동춘1동", "동춘2동", "동춘3동", "송도1동", "송도2동", "송도3동", "송도4동", "송도5동"]
      },
      namdong: {
        name: "남동구",
        dongs: ["구월1동", "구월2동", "구월3동", "구월4동", "간석1동", "간석2동", "간석3동", "간석4동", "만수1동", "만수2동", "만수3동", "만수4동", "만수5동", "만수6동", "장수서창동", "서창2동", "남촌도림동", "논현1동", "논현2동", "논현고잔동"]
      },
      bupyeong: {
        name: "부평구",
        dongs: ["부평1동", "부평2동", "부평3동", "부평4동", "부평5동", "부평6동", "산곡1동", "산곡2동", "산곡3동", "산곡4동", "청천1동", "청천2동", "갈산1동", "갈산2동", "삼산1동", "삼산2동", "부개1동", "부개2동", "부개3동", "일신동", "십정1동", "십정2동"]
      },
      gyeyang: {
        name: "계양구",
        dongs: ["효성1동", "효성2동", "계산1동", "계산2동", "계산3동", "계산4동", "작전1동", "작전2동", "작전서운동", "계양1동", "계양2동", "계양3동"]
      },
      seohae: {
        name: "서해구",
        dongs: ["청라1동", "청라2동", "청라3동", "가정1동", "가정2동", "가정3동", "신현원창동", "석남1동", "석남2동", "석남3동", "가좌1동", "가좌2동", "가좌3동", "가좌4동", "연희동"]
      },
      geomdan: {
        name: "검단구",
        dongs: ["검단동", "불로대곡동", "원당동", "당하동", "오류왕길동", "마전동", "아라동", "검암경서동"]
      },
      ganghwa: {
        name: "강화군",
        dongs: ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"]
      },
      ongjin: {
        name: "옹진군",
        dongs: ["북도면", "연평면", "백령면", "대청면", "덕적면", "자월면", "영흥면"]
      }
    }
  }
};

const initialLocalShops = [
  {
    id: 1,
    name: "🔥 한국미인홈케어",
    desc: "서울·경기·인천 전지역 신속 방문! 정성 가득한 테라피 & 릴렉싱 프로그램",
    phone: "0507-1280-3303",
    price: "100,000원부터~",
    image: "/shop1.jpg"
  },
  {
    id: 2,
    name: "✨ 오늘밤테라피",
    desc: "품격 있는 힐링을 선사하는 최고급 오일 프라이빗 방문 테라피 서비스",
    phone: "0507-1280-3223",
    price: "60,000원부터~",
    image: "/shop2.jpg"
  },
  {
    id: 3,
    name: "💎 주주테라피",
    desc: "재방문율 1위! 칼도착 25분 보장, 철저한 위생 관리와 럭셔리 케어",
    phone: "0507-1280-3193",
    price: "60,000원부터~",
    image: "/shop3.jpg"
  },
  {
    id: 4,
    name: "🌟퀸즈홈테라피",
    desc: "전문 힐러들의 맞춤형 VIP 피로회복 특화 프로그램 진행 중",
    phone: "0507-1280-3334",
    price: "60,000원부터~",
    image: "/shop4.jpg"
  },
  {
    id: 5,
    name: "👑 골든테라피",
    desc: "선입금 없는 100% 후불제! 수도권 전지역 평균 25분 내 실시간 도착",
    phone: "0507-1280-3360",
    price: "110,000원부터~",
    image: "/shop5.jpg"
  }
];

export default function MainClientUI() {
  const [selectedRegion, setSelectedRegion] = useState("seoul");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDong, setSelectedDong] = useState("");
  const [shuffledShops, setShuffledShops] = useState(initialLocalShops);

  useEffect(() => {
    const shops = [...initialLocalShops];
    for (let i = shops.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shops[i], shops[j]] = [shops[j], shops[i]];
    }
    setShuffledShops(shops);
  }, []);

  // 1단계: 시·도 변경 시 구와 동을 초기화
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedDistrict("");
    setSelectedDong("");
  };

  // 2단계: 구·시 변경 시 동을 초기화
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedDong("");
  };

  // 🌟 1번 페이지 이동: 직접 키워드 (/[region]/[district])
  const handleDirectSearch = () => {
    if (!selectedDistrict) {
      alert("원하시는 지역(구/시)을 먼저 선택해주세요!");
      return;
    }
    const districtObj = regionData[selectedRegion]?.districts[selectedDistrict];
    const districtName = districtObj ? districtObj.name : selectedDistrict;
    
    const baseUrl = `/${selectedRegion}/${encodeURIComponent(districtName)}`;
    const targetUrl = selectedDong 
      ? `${baseUrl}?dong=${encodeURIComponent(selectedDong)}` 
      : baseUrl;
    
    window.location.href = targetUrl;
  };

  // 🌟 2번 페이지 이동: 띄어쓰기 회피형 (/massage/[region]/[district])
  const handleSpacedSearch = () => {
    if (!selectedDistrict) {
      alert("원하시는 지역(구/시)을 먼저 선택해주세요!");
      return;
    }
    const districtObj = regionData[selectedRegion]?.districts[selectedDistrict];
    const districtName = districtObj ? districtObj.name : selectedDistrict;
    
    const baseUrl = `/massage/${selectedRegion}/${encodeURIComponent(districtName)}`;
    const targetUrl = selectedDong 
      ? `${baseUrl}?dong=${encodeURIComponent(selectedDong)}` 
      : baseUrl;
    
    window.location.href = targetUrl;
  };

  // 구/시 목록 추출
  const currentDistricts = regionData[selectedRegion]?.districts || {};
  const currentDistrictKeys = Object.keys(currentDistricts);

  // 동 목록 추출
  const currentDongs = (selectedDistrict && currentDistricts[selectedDistrict]?.dongs) || [];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="무드앤휴 로고" 
              className="w-10 h-10 rounded-xl object-cover border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                무드앤휴
              </span>
              <span className="text-[10px] text-gray-400 tracking-tighter">SEOUL · GYEONGGI · INCHEON</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-red-500/20 text-amber-300 border border-amber-500/30 font-bold shadow-inner">
              🔥 24시 실시간 영업중
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        
        {/* 상단 메인 배너 */}
        <section className="text-center my-2">
          <div className="overflow-hidden rounded-3xl border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative h-60 md:h-80 flex items-center justify-center p-6">
            <div className="absolute inset-0 z-0">
              <img 
                src="/banner.jpg" 
                alt="메인 힐링 배너" 
                className="w-full h-full object-cover filter brightness-[0.35] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 space-y-3">
              <span className="inline-block px-4 py-1 rounded-full bg-amber-500 text-black font-extrabold text-xs tracking-widest shadow-lg animate-bounce">
                ✨ 100% 후불제 안심 보장 시스템
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                서울·경기·인천 <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">25분 내 신속 방문 케어</span>
              </h1>
              <p className="text-gray-200 text-xs md:text-sm font-medium max-w-lg mx-auto drop-shadow">
                엄선된 최고급 베테랑 관리사의 프라이빗 피로회복 프로그램! 지금 바로 무드앤휴 제휴업체를 만나보세요.
              </p>
            </div>
          </div>
        </section>

        {/* 메인 추천 제휴업체 5개 */}
        <section className="space-y-6">
          <div className="text-center mb-6">
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">BEST RECOMMENDED SHOPS</p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              🏆 무드앤휴 최고의 추천 제휴업체 (5곳)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shuffledShops.map((lShop) => (
              <div key={lShop.id} className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-md transition-all group relative">
                <Link href={`/shop/${lShop.id}`} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세페이지 보기`} />
                <img 
                  src={lShop.image} 
                  alt={lShop.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                    {lShop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{lShop.price}</span>
                    <a 
                      href={`tel:${lShop.phone}`} 
                      className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow transition-colors relative z-20"
                    >
                      전화연결
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🌟 분리 이동 가능한 다중 시·구·동 검색 박스 */}
        <section className="pt-6 border-t border-white/10">
          <div className="bg-gradient-to-b from-[#18181b] to-[#0f0f11] border-2 border-amber-500/40 p-6 rounded-3xl max-w-xl mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-left relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs text-amber-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                📍 내 동네 검색 및 페이지 선택 이동
              </label>
              <span className="text-[11px] text-gray-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                수도권 전체 지원
              </span>
            </div>

            <div className="space-y-3.5">
              {/* 1단계: 시·도 선택 */}
              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">1단계: 시·도 선택</span>
                <select 
                  value={selectedRegion} 
                  onChange={handleRegionChange} 
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30 focus:border-amber-400 transition-colors shadow-inner"
                >
                  <option value="seoul" className="bg-[#1e1e1e]">서울특별시 (25개 구)</option>
                  <option value="gyeonggi" className="bg-[#1e1e1e]">경기도 (31개 시·군/구)</option>
                  <option value="incheon" className="bg-[#1e1e1e]">인천광역시 (11개 구·군)</option>
                </select>
              </div>

              {/* 2단계: 구·시·군 선택 */}
              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">
                  2단계: 구·시·군 선택 ({currentDistrictKeys.length}개 지역)
                </span>
                <select 
                  value={selectedDistrict} 
                  onChange={handleDistrictChange} 
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30 focus:border-amber-400 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1e1e1e] text-gray-400">
                    -- 구 / 시 / 군을 선택해주세요 --
                  </option>
                  {currentDistrictKeys.map((dKey) => (
                    <option key={dKey} value={dKey} className="bg-[#1e1e1e] text-white">
                      {currentDistricts[dKey].name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3단계: 동 선택 */}
              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">
                  3단계: 동 선택 {selectedDistrict ? `(${currentDongs.length}개 동)` : "(구/시 선택 필요)"}
                </span>
                <select 
                  value={selectedDong} 
                  onChange={(e) => setSelectedDong(e.target.value)} 
                  disabled={!selectedDistrict}
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-medium p-3.5 rounded-xl border border-amber-500/30 disabled:opacity-40 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1e1e1e] text-gray-400">
                    {selectedDistrict ? "구/시 전체 보기 (동 무관)" : "구/시를 먼저 선택해주세요"}
                  </option>
                  {currentDongs.map((dong, idx) => (
                    <option key={idx} value={dong} className="bg-[#1e1e1e] text-white">
                      {dong}
                    </option>
                  ))}
                </select>
              </div>

              {/* 🌟 1번 & 2번 페이지 선택 이동 듀얼 버튼 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {/* 1번 페이지 이동 버튼 */}
                <button 
                  onClick={handleDirectSearch}
                  className="w-full bg-[#1c1c20] hover:bg-[#25252b] text-amber-400 font-bold py-3.5 px-3 rounded-2xl text-xs border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 active:scale-95 shadow-md"
                >
                  <span className="text-[10px] text-gray-400 font-medium">직접 키워드 전용</span>
                  <span className="font-extrabold text-white text-xs">📍 1번: 지역 홈케어 보기</span>
                </button>

                {/* 2번 페이지 이동 버튼 */}
                <button 
                  onClick={handleSpacedSearch}
                  className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 px-3 rounded-2xl text-xs transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer flex flex-col items-center justify-center gap-1 active:scale-95"
                >
                  <span className="text-[10px] text-neutral-800 font-bold">띄어쓰기 타겟 전용</span>
                  <span className="font-black text-black text-xs">💆 2번: 마사지 코스 보기</span>
                </button>
              </div>

              <p className="text-[10px] text-gray-400 text-center pt-1">
                * 1번(홈케어)과 2번(마사지) 페이지는 각각 별점 스키마와 최적화된 SEO 키워드가 적용되어 있습니다.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a 
              href="tel:0507-1280-3344" 
              className="inline-flex items-center gap-1.5 bg-neutral-900 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 text-xs shadow-md hover:border-amber-400 transition-colors"
            >
              <span>🤝</span> 제휴문의 (0507-1280-3344)
            </a>
          </div>
          <p className="text-gray-400 font-bold">무드앤휴는 건전하고 안전한 제휴 마사지 정보 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; 무드앤휴 ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}