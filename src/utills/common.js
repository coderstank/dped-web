import moment from "moment";
convertDate();
export const YEARS = Array.from(
  { length: new Date().getFullYear() - 1975 + 1 },
  (_, i) => (1975 + i).toString()
);

export const DROPDOWNS = {
  DISTRICTS: [
    "W.C.(BETTIAH) (35)",
    "PATNA (11)",
    "BHAGALPUR (71)",
    "AURANGABAD (24)",
    "SARAN (41)",
    "SIWAN (42)",
    "BHOJPUR (13)",
    "SITAMARHI (32)",
    "KAIMUR (16)",
    "LAKHISARAI (85)",
    "SAMASTIPUR (53)",
    "GAYA (21)",
    "MADHUBANI (52)",
    "BEGUSARAI (84)",
    "SAHARSA (61)",
    "KHAGARIA (83)",
    "JAMUI (82)",
    "JEHANABAD (22)",
    "ROHTAS (15)",
    "E.C(MOTIHARI) (34)",
    "MUZAFFARPUR (31)",
    "BANKA (72)",
    "KISHANGANJ (93)",
    "SHEIKHPURA (86)",
    "SUPAUL (62)",
    "KATIHAR (94)",
    "NAWADA (23)",
    "DARBHANGA (51)",
    "GOPALGANJ (43)",
    "SHEOHAR (36)",
    "MADHEPURA (63)",
    "PURNEA (91)",
    "MUNGER (81)",
    "NALANDA (12)",
    "ARWAL (25)",
    "VAISHALI (33)",
    "ARARIA (92)",
    "BUXAR (14)",
    "OTHER STATE (99)",
  ].map((d) => ({ label: d, value: d })),
  GENDER: [
    {
      label: "MALE",
      value: "MALE",
    },
    {
      label: "FEMALE",
      value: "FEMALE",
    },
    {
      label: "TRANSGENDER",
      value: "TRANSGENDER",
    },
  ],
  BOOLEAN: [
    {
      label: "YES",
      value: true,
    },
    {
      label: "NO",
      value: false,
    },
  ],
  PASSING_YEAR: YEARS.map((y) => ({ label: y, value: y })),
  DIVISION: [
    {
      label: "FIRST",
      value: "FIRST",
    },
    {
      label: "SECOND",
      value: "SECOND",
    },
    {
      label: "THIRD",
      value: "THIRD",
    },
  ],
  CATEGORY: [
    {
      label: "UR",
      value: "UR",
    },
    {
      label: "EWS",
      value: "EWS",
    },
    {
      label: "EBC",
      value: "EBC",
    },
    {
      label: "BC",
      value: "BC",
    },
    {
      label: "SC",
      value: "SC",
    },
    {
      label: "ST",
      value: "ST",
    },
  ],
  PAYMENT_STATUS: [
    {
      label: "PAID",
      value: "paid",
    },
    {
      label: "PENDING",
      value: "pending",
    },
    {
      label: "HOLD",
      value: "hold",
    },
  ],
  SESSION: [
    {
      label: "2020-2022",
      value: "2020-2022",
    },
    {
      label: "2021-2023",
      value: "2021-2023",
    },
    {
      label: "2022-2024",
      value: "2022-2024",
    },
    {
      label: "2023-2025",
      value: "2023-2025",
    },
  ],
  YEAR: [
    {
      label: "FIRST YEAR",
      value: 1,
    },
    {
      label: "SECOND YEAR",
      value: 2,
    },
  ],
  EXAM_TYPE: [
    {
      label: "BACK",
      value: "back",
    },
    {
      label: "CURRENT",
      value: "current",
    },
  ],
  DIFFERENTLY_ABLED: [
    {
      label: "VISUALLY DISABLED",
      value: "VISUALLY DISABLED",
    },
    {
      label: "HEARING DISABLED",
      value: "HEARING DISABLED",
    },
    {
      label: "MENTALLY DISABLED",
      value: "MENTALLY DISABLED",
    },
    {
      label: "LOCOMOTOR DISABLED",
      value: "LOCOMOTOR DISABLED",
    },
  ],
  FACULTY: [
    {
      label: "SCIENCE",
      value: "SCIENCE",
    },
    {
      label: "ARTS",
      value: "ARTS",
    },
    {
      label: "COMMERCE",
      value: "COMMERCE",
    },
  ],
  MEDIUM: [
    {
      label: "HINDI",
      value: "HINDI",
    },
    {
      label: "ENGLISH",
      value: "ENGLISH",
    },
  ],
  RELIGION: [
    {
      label: "HINDU",
      value: "HINDU",
    },
    {
      label: "CHRISTIANITY",
      value: "CHRISTIANITY",
    },
    {
      label: "SIKHISM",
      value: "SIKHISM",
    },
    {
      label: "BUDDHISM",
      value: "BUDDHISM",
    },
    {
      label: "JAIN",
      value: "JAIN",
    },
    {
      label: "OTHERS",
      value: "OTHERS",
    },
    {
      label: "ISLAM",
      value: "ISLAM",
    },
  ],
};

export const qualificationOptions = [
  {
    label: "matric",
    name: "MATRIC",
  },
  {
    label: "intermediate",
    name: "INTERMEDIATE",
  },
];

export const SUBJECTS = {
  FIRST_YEAR_22_23: {
    THEORY: [
      {
        code: "DPET-101",
        name: "History and Principles of Physical Education",
      },
      { code: "DPET-102", name: "Foundations of Physical Education" },
      { code: "DPET-103", name: "Basic Anatomy and Physiology" },
      { code: "DPET-104", name: "Recreation and value education" },
      { code: "DPET-105", name: "Yoga Education" },
      { code: "DPET-106", name: "Health Education and Environmental Studies" },
      { code: "DPET-107", name: "Methods of Physical Education" },
      {
        code: "DPET-108",
        name: "Adapted Physical Education and Corrective Exercises",
      },
    ],
    PRACTICAL: [
      {
        code: "PC-201",
        name: ["Swimming", "Gymnastics"],
      },
      {
        code: "PC-202",
        name: ["Badminton", "Cricket", "Football", "Kabbadi", "Throwball"],
      },
      {
        code: "PC-203",
        name: "Minor Games",
      },
      {
        code: "PC-204",
        name: [
          "Calisthenics",
          "Dumb-bell",
          "Flag Hoisting",
          "Hoops",
          "Lezium",
          "March-Past",
          "Umbrella",
          "Wands",
        ],
      },
      {
        code: "PC-205",
        name: ["Swimming", "Gymnastics"],
      },
      {
        code: "PC-206",
        name: ["Ball Badminton", "Handball", "Hockey", "Kho-Kho", "Softball"],
      },
      {
        code: "PC-207",
        name: ["Aerobics", "Chess", "Kolatam", "Malkhambh", "Shooting", "Yoga"],
      },
      {
        code: "TP-208",
        name: "Teaching, Practice, General Lesson Plans in 1 Year, Out of 10 lessons 4 Internal and 1 External and 5 lessons at Schools",
      },
    ],
  },
  SECOND_YEAR_22_23: {
    THEORY: [
      { code: "T-301", name: "Sports Training" },
      { code: "T-302", name: "Child Psychology and Sociology" },
      { code: "T-303", name: "Information Technology in Physical Education" },
      { code: "T-304", name: "Youth Leadership and Social Welfare" },
      { code: "T-305", name: "Sports injuries and Rehabilitation" },
      {
        code: "T-306",
        name: "Organisation and Administration of Physical Education",
      },
      { code: "T-307", name: "Test and Measurement in Physical Education" },
      { code: "T-308", name: "Nutrition and Naturopathy" },
    ],
    PRACTICAL: [
      {
        code: "PC-401",
        name: ["Swimming", "Gymnastics"],
      },
      {
        code: "PC-402",
        name: [
          "Basketball",
          "Table-Tennis",
          "Tennikoit",
          "Tennis",
          "Volleyball",
        ],
      },
      {
        code: "PC-403",
        name: [
          "Boxing",
          "Fencing",
          "Judo",
          "Karate",
          "Taekwondo",
          "Bharathiyam",
          "Combatives",
          "Dands & Baithaks",
          "National Songs",
          "Surya Namskaram",
        ],
      },
    ],
  },
  FIRST_YEAR_24: {
    THEORY: [
      {
        code: "DPET-101",
        name: "History and Principles of Physical Education",
      },
      { code: "DPET-102", name: "Foundations of Physical Education" },
      { code: "DPET-103", name: "Basic Anatomy and Physiology" },
      { code: "DPET-104", name: "Recreation and value education" },
      { code: "DPET-105", name: "Yoga Education" },
      { code: "DPET-106", name: "Health Education and Environmental Studies" },
      { code: "DPET-107", name: "Methods of Physical Education" },
      {
        code: "DPET-108",
        name: "Adapted Physical Education and Corrective Exercises",
      },
    ],
    PRACTICAL: [
      {
        code: "DPET-109",
        name: ["Swimming", "Gymnastics"],
      },
      {
        code: "DPET-110",
        name: ["Badminton", "Cricket", "Football", "Kabbadi", "Throwball"],
      },
      {
        code: "DPET-111",
        name: "Minor Games",
      },
      {
        code: "DPET-112",
        name: [
          "Calisthenics",
          "Dumb-bell",
          "Flag Hoisting",
          "Hoops",
          "Lezium",
          "March-Past",
          "Umbrella",
          "Wands",
        ],
      },
      {
        code: "DPET-113",
        name: ["Swimming", "Gymnastics"],
      },
      {
        code: "DPET-114",
        name: ["Ball Badminton", "Handball", "Hockey", "Kho-Kho", "Softball"],
      },
      {
        code: "DPET-115",
        name: ["Aerobics", "Chess", "Kolatam", "Malkhambh", "Shooting", "Yoga"],
      },
      {
        code: "DPET-116",
        name: "Teaching, Practice, General Lesson Plans in 1 Year, Out of 10 lessons 4 Internal and 1 External and 5 lessons at Schools",
      },
    ],
  },
  SECOND_YEAR_24: {
    THEORY: [
      { code: "DPET-201", name: "Sports Training" },
      { code: "DPET-202", name: "Child Psychology and Sociology" },
      {
        code: "DPET-203",
        name: "Information Technology in Physical Education",
      },
      { code: "DPET-204", name: "Youth Leadership and Social Welfare" },
      { code: "DPET-205", name: "Sports injuries and Rehabilitation" },
      {
        code: "DPET-206",
        name: "Organisation and Administration of Physical Education",
      },
      { code: "DPET-207", name: "Test and Measurement in Physical Education" },
      { code: "DPET-208", name: "Nutrition and Naturopathy" },
    ],
    PRACTICAL: [
      {
        code: "DPET-209",
        name: ["Swimming", "Gymnastics"],
      },
      {
        code: "DPET-210",
        name: [
          "Basketball",
          "Table-Tennis",
          "Tennikoit",
          "Tennis",
          "Volleyball",
        ],
      },
      {
        code: "DPET-211",
        name: [
          "Boxing",
          "Fencing",
          "Judo",
          "Karate",
          "Taekwondo",
          "Bharathiyam",
          "Combatives",
          "Dands & Baithaks",
          "National Songs",
          "Surya Namskaram",
        ],
      },
      {
        code: "DPET-212",
        name: ["Athletics Specialization"],
      },
      {
        code: "DPET-213",
        name: [
          "Badminton",
          "Ball Badminton",
          "Basketball",
          "Cricket",
          "Football",
          "Handball",
          "Hockey",
          "Kabbadi",
          "Kho-Kho",
          "Softball",
          "Tennis",
          "Table Tennis",
          "Volleyball",
        ],
      },
      {
        code: "DPET-214",
        name: [
          "Teaching Practice in Sports Specialization: Coaching lesson Plan in Track in Field/Swimming/Gymnastics",
        ],
      },
      {
        code: "DPET-215",
        name: [
          "Particular lesson Plans in any one game from I & II year. 5 lessons (4 Internal & 1 External)",
        ],
      },
    ],
    TEACHING_PRACTICAL: [
      {
        code: "DPET-216",
        name: [
          "Badminton",
          "Ball Badminton",
          "Basketball",
          "Cricket",
          "Football",
          "Handball",
          "Hockey",
          "Kabbadi",
          "Kho-Kho",
          "Softball",
          "Tennis",
          "Table Tennis",
          " Volleyball",
        ],
      },
    ],
  },
  FIRST_YEAR_25: {
    THEORY: [
      {
        code: "DPET-101",
        name: "History and Principles of Physical Education",
      },
      { code: "DPET-102", name: "Foundations of Physical Education" },
      { code: "DPET-103", name: "Basic Anatomy and Physiology" },
      { code: "DPET-104", name: "Recreation and value education" },
      { code: "DPET-105", name: "Yoga Education" },
      { code: "DPET-106", name: "Health Education and Environmental Studies" },
      { code: "DPET-107", name: "Methods of Physical Education" },
      {
        code: "DPET-108",
        name: "Adapted Physical Education and Corrective Exercises",
      },
    ],
    PRACTICAL: [
      {
        code: "DPET-109",
        name: ["Swimming", "Gymnastics"],
      },
      {
        code: "DPET-110",
        name: ["Badminton", "Cricket", "Football", "Kabbadi", "Throwball"],
      },
      {
        code: "DPET-111",
        name: "Minor Games",
      },
      {
        code: "DPET-112",
        name: [
          "Calisthenics",
          "Dumb-bell",
          "Flag Hoisting",
          "Hoops",
          "Lezium",
          "March-Past",
          "Umbrella",
          "Wands",
        ],
      },
      {
        code: "DPET-113",
        name: ["Swimming", "Gymnastics"],
      },
      {
        code: "DPET-114",
        name: ["Ball Badminton", "Handball", "Hockey", "Kho-Kho", "Softball"],
      },
      {
        code: "DPET-115",
        name: ["Aerobics", "Chess", "Kolatam", "Malkhambh", "Shooting", "Yoga"],
      },
    ],
    TEACHING_PRACTICAL: [
      {
        code: "DPET-116",
        name: "Calisthenics and teaching practice for basic sports skill. 5 teaching practices of each lesson",
      },
    ],
  },
};

export const QualificationTableColumns = [
  {
    title: "Course",
    key: "qualification",
    dataIndex: "qualification",
  },
  {
    title: "Name of the Board",
    key: "board",
    dataIndex: "board",
  },
  {
    title: "Name of the School",
    key: "School",
    dataIndex: "school",
  },
  {
    title: "Roll Code",
    key: "roll_code",
    dataIndex: "roll_code",
  },
  {
    title: "Roll Number",
    key: "roll_number",
    dataIndex: "roll_no",
  },
  {
    title: "Passing Year",
    key: "passing_year",
    dataIndex: "passing_year",
  },
  {
    title: "Marks Obtained",
    key: "marks_obtained",
    dataIndex: "marks_obtained",
  },
  {
    title: "Division",
    key: "division",
    dataIndex: "division",
  },
  {
    title: "Percentage",
    key: "percentage",
    dataIndex: "percentage",
  },
];

function convertDate() {
  var STRINGS = {
    nodiff: "",
    year: "year",
    years: "years",
    month: "month",
    months: "months",
    day: "day",
    days: "days",
    hour: "hour",
    hours: "hours",
    minute: "minute",
    minutes: "minutes",
    second: "second",
    seconds: "seconds",
    delimiter: " ",
  };

  function pluralize(num, word) {
    return num + " " + STRINGS[word + (num === 1 ? "" : "s")];
  }

  function buildStringFromValues(
    yDiff,
    mDiff,
    dDiff,
    hourDiff,
    minDiff,
    secDiff
  ) {
    var result = [];

    if (yDiff) {
      result.push(pluralize(yDiff, "year"));
    }
    if (mDiff) {
      result.push(pluralize(mDiff, "month"));
    }
    if (dDiff) {
      result.push(pluralize(dDiff, "day"));
    }
    if (hourDiff) {
      result.push(pluralize(hourDiff, "hour"));
    }
    if (minDiff) {
      result.push(pluralize(minDiff, "minute"));
    }
    if (secDiff) {
      result.push(pluralize(secDiff, "second"));
    }

    return result.join(STRINGS.delimiter);
  }

  function buildValueObject(
    yDiff,
    mDiff,
    dDiff,
    hourDiff,
    minDiff,
    secDiff,
    firstDateWasLater
  ) {
    return {
      years: yDiff,
      months: mDiff,
      days: dDiff,
      hours: hourDiff,
      minutes: minDiff,
      seconds: secDiff,
      firstDateWasLater: firstDateWasLater,
    };
  }
  moment.fn.preciseDiff = function (d2, returnValueObject) {
    return moment.preciseDiff(this, d2, returnValueObject);
  };

  moment.preciseDiff = function (d1, d2, returnValueObject) {
    var m1 = moment(d1),
      m2 = moment(d2),
      firstDateWasLater;

    m1.add(m2.utcOffset() - m1.utcOffset(), "minutes"); // shift timezone of m1 to m2

    if (m1.isSame(m2)) {
      if (returnValueObject) {
        return buildValueObject(0, 0, 0, 0, 0, 0, false);
      } else {
        return STRINGS.nodiff;
      }
    }
    if (m1.isAfter(m2)) {
      var tmp = m1;
      m1 = m2;
      m2 = tmp;
      firstDateWasLater = true;
    } else {
      firstDateWasLater = false;
    }

    var yDiff = m2.year() - m1.year();
    var mDiff = m2.month() - m1.month();
    var dDiff = m2.date() - m1.date();
    var hourDiff = m2.hour() - m1.hour();
    var minDiff = m2.minute() - m1.minute();
    var secDiff = m2.second() - m1.second();

    if (secDiff < 0) {
      secDiff = 60 + secDiff;
      minDiff--;
    }
    if (minDiff < 0) {
      minDiff = 60 + minDiff;
      hourDiff--;
    }
    if (hourDiff < 0) {
      hourDiff = 24 + hourDiff;
      dDiff--;
    }
    if (dDiff < 0) {
      var daysInLastFullMonth = moment(
        m2.year() + "-" + (m2.month() + 1),
        "YYYY-MM"
      )
        .subtract(1, "M")
        .daysInMonth();
      if (daysInLastFullMonth < m1.date()) {
        // 31/01 -> 2/03
        dDiff = daysInLastFullMonth + dDiff + (m1.date() - daysInLastFullMonth);
      } else {
        dDiff = daysInLastFullMonth + dDiff;
      }
      mDiff--;
    }
    if (mDiff < 0) {
      mDiff = 12 + mDiff;
      yDiff--;
    }

    if (returnValueObject) {
      return buildValueObject(
        yDiff,
        mDiff,
        dDiff,
        hourDiff,
        minDiff,
        secDiff,
        firstDateWasLater
      );
    } else {
      return buildStringFromValues(
        yDiff,
        mDiff,
        dDiff,
        hourDiff,
        minDiff,
        secDiff
      );
    }
  };
}
