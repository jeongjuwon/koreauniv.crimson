const { PrismaClient } = require("@prisma/client");

// const { encryptPassword } = require("../libs/password");

(async function () {
  // await prismaClient.$queryRaw`DELETE FROM Club`;

  const prismaClient = new PrismaClient();
  const newClub = await prismaClient.club.create({
    data: {
      image: "/images/student_council.jpg",
      name: "학생회",
      description:
        "학생회 활동은 총학생회와 세종총학생회를 중심으로 전개되고 있으며 각 단과대학[학부]별 학생회 및 각 학과[학부]별 학생회로 구성되어 있다. 학생들은 각 학생회에서 주최하는 행사, 사업 및 연구활동에 참여하여 학풍을 쇄신하고 자치정신을 함양하고 있다.",
    },
  });
  await prismaClient.club.create({
    data: {
      image: "/images/volunteer.jpg",
      name: "사회봉사단",
      description: `더불어 사는 참다운 가치를 실천하는 KUSSO

        고려대학교 사회봉사단은 2008년 10월 발대 이래, '실천하는 지성, 생각하는 리더, 사회에 힘이 되는 대학' 이라는 모토 아래 진정한 '노블리스 오블리제'를 실현하기 위해 힘차게 달려왔습니다. 사회봉사단은 이 시대가 요구하는 진정한 지식인으로서의 책임을 다하기 위해 대한민국을 넘어 세계인류를 위한 더 큰 노력과 봉사를 실천하고자 합니다.
        더 나아가 '지속가능 발전목표(SDGs: Sustainable Development Goals)' 기반의 '사회적 가치(CSV: Creating Shared Values)'를 창출하는 요람으로서 대학의 사회적 책임과 기여를 실천하고자 합니다.`,
    },
  });
  await prismaClient.club.create({
    data: {
      image: "/images/basketball.jpg",
      name: "농구부",
      description: `보성전문 농구팀이 대외경기 활동을 시작한 것은 1929년. YMCA주최 농구선수권전 제1회 전문부전에 출전하여 상대팀을 22:10으로 물리치고 우승한 것을 시작으로 1931년에는 조선체육회와 YMCA 공동주최로 열린 제1회 전조선농구대회 준결승에서 연희전문을 35:13으로 대파, 마침내 우승을 하였다. 본교 농구부는 이러한 튼튼한 뿌리를 토대로 국내 프로농구팀에서 지도자 및 선수로서 활약하고 있다.`,
    },
  });
  await prismaClient.club.create({
    data: {
      image: "/images/icehaki.jpg",
      name: "아이스하키부",
      description: `1939년 1월 창단되어 빙판을 가르던 보전 빙구팀은 1946년 제1회 종별 빙구리그 대학부 우승을 시작으로 1947년과 1948년 각종대회에서 연세대를 대파하면서 그 위력을 떨치기 시작했다. 한때 연세대의 기세에 고전을 면치 못하던 본교 아이스하키부는 1998년에 본교 전용아이스링크의 완공과 더불어 전력의 향상으로 옛 명성에 조금씩 근접해 가며 그 위력을 떨치고 있다.`,
    },
  });
  await prismaClient.club.create({
    data: {
      image: "/images/soccer.jpg",
      name: "축구부",
      description: `1923년 11월 우리나라 체육활동이 시작되던 구한말 일제치하에 본교의 전신인 보성전문의 팀이 주축이 되어 활동을 시작. 일본에서도 훌륭한 성적을 올림으로써 축구 이외의 또 다른 운동 종목들이 성장할 수 있는 여건을 조성하며 우리나라 체육사의 서막을 열 수 있도록 하였다. 본교 출신의 선수들이 국내 프로리그에서 각 팀의 주축선수로써 뛰어난 활약을 보이고 있으며 1948년 런던올림픽에 GK 로 출전한 홍덕영을 시작으로 지난 2002 FIFA 한ㆍ일 WORLD CUP에서는 가장 많은 선수 및 코칭스태프를 출전시켰고 홍명보, 차두리, 박주영 등 선수들의 꾸준한 해외무대 진출로 국내 뿐 아니라 해외에서도 인정받는 축구 명문으로 발돋움 해 가고 있다.`,
    },
  });
  await prismaClient.club.create({
    data: {
      image: "/images/rugby.jpg",
      name: "럭비부",
      description: `929년 5월 일본농대에서 럭비선수로 활약 중이던 이종구가 보성전문학교로 전교하여 팀을 창단. 당시 5개월이라는 짧은 훈련으로 10월 13일 철도구장에서 경성상업과 첫 시합을 벌여 13:5로 분패했지만 이것이 바로 한국 럭비의 시초였다. 본교 럭비부는 대한민국 럭비종가로서 한국럭비발전을 위해 노력하고 있으며 우리선수의 해외진출에도 적극적인 노력을 기울이고 있다.`,
    },
  });
  await prismaClient.club.create({
    data: {
      image: "/images/baseball.jpg",
      name: "야구부",
      description: `1948년 창설된 야구부는 6,25전란으로 해체되었다가 고ㆍ연전 부활로 급조되어 실력을 쌓아오던 중 1960년 대학야구연맹전에서 최초로 우승을 하였다. 국내프로야구의 출범을 계기로 본교 야구부는 더욱 명성을 떨치게 되었으며 국보급 투수라는 선동열을 배출한 것을 비롯하여 많은 본교 출신 선수, 코칭스태프가 활약하며 올림픽 출전을 위해 정진하고 있다.`,
    },
  });
})();
