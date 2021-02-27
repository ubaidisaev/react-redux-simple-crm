import { IRootState } from "@/store/interfaces";
import { WithTranslation } from "react-i18next";

export function getClientFullName({ last_name, first_name, middle_name }: any) {
  let name = "";
  if (first_name) name += first_name;
  if (middle_name) {
    if (name !== "") name += " ";
    name += middle_name;
  }
  if (last_name) {
    if (name !== "") name += " ";
    name += last_name;
  }
  if (!name) name = "Без имени";

  return name;
}

/**
 * Start replace dangerous symbols
 */
const tagsToReplace = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

function replaceTag(tag: string) {
  // @ts-ignore
  return tagsToReplace[tag] || tag;
}

export function safeTagsReplace(str: string | null) {
  if (!str) return "";
  return str.replace(/[&<>]/g, replaceTag);
}

export const getSearchMatch = (clientResult: string, term?: string) => {
  if (term) {
    const invalid = /[°"§%()[\]{}=\\?´`'#<>|,;.:+_-]+/g;
    clientResult = safeTagsReplace(clientResult);
    term = term.replace(invalid, "");
    return clientResult.replace(
      new RegExp(term, "gi"),
      (match) => `<mark>${match}</mark>`
    );
  }
  return clientResult;
};

export const getWinWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export const isAllowFilter = (client: any, term: string) => {
  term = term.toLowerCase();
  const words: string[] = [];

  if (client) {
    if (client.first_name) {
      words.push(client.first_name.toLowerCase());
    }
    if (client.middle_name) {
      words.push(client.middle_name.toLowerCase());
    }
    if (client.last_name) {
      words.push(client.last_name.toLowerCase());
    }
    if (client.company_name) {
      words.push(client.company_name.toLowerCase());
    }
    words.push(getClientFullName(client).toLowerCase());
  }

  return words.some((word) => word.indexOf(term) !== -1);
};

export const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const WEEKDAYS = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

// {stamp: task.deadline_ts}

interface IGetDayAndMonthByTimeStamp {
  stamp: number;
  short?: boolean;
  weekDay?: boolean;
}

export const getDayAndMonthByTimeStamp = (
  params: IGetDayAndMonthByTimeStamp,
  translate?: WithTranslation["t"]
) => {
  const { stamp, short = false, weekDay = false } = params;

  let date = new Date(stamp);
  let month = "";

  month = MONTHS[date.getMonth()];

  if (short && month.length > 3) month = month.slice(0, 3);
  let result = `${date.getDate()} ${month}`;
  if (weekDay) {
    let day = "";
    if (translate) day = translate(`date.weekday.${date.getDay()}`);
    else day = WEEKDAYS[date.getDay()];
    result = day + ", " + result;
  }

  return result;
};

export interface ITaskListItem {
  title: string;
  list: {
    id: string;
    expired: boolean;
    priority?: number;
  }[];
  expired: boolean;
  checked?: boolean;
}

export const getFilteredAndSortedByDeadlineTasks = (
  state: IRootState,
  translate: WithTranslation["t"]
) => {
  const { taskList } = state.task;
  const [today, tomorrow, afterTomorrow] = getDaysTimestamp(3);
  const taskIds = filterTaskIds(state);
  // taskIds.sort(
  //   (a, b) => (taskList[a].deadline_ts || 0) - (taskList[b].deadline_ts || 0)
  // );

  let tasks: ITaskListItem[] = [
    {
      title: translate("tasks.deadline.expired"),
      list: [],
      expired: true,
    },
    {
      title: translate("tasks.deadline.today"),
      list: [],
      expired: false,
    },
    {
      title: translate("tasks.deadline.tomorrow"),
      list: [],
      expired: false,
    },
    {
      title: translate("tasks.deadline.soon"),
      list: [],
      expired: false,
    },
    {
      title: translate("tasks.deadline.someday"),
      list: [],
      expired: false,
    },
    {
      title: translate("tasks.deadline.ready"),
      list: [],
      expired: false,
    },
  ];

  taskIds.forEach((id) => {
    const task = taskList[id];
    let index: number | null = null;
    let expired = false;
    if (task.checked) {
      index = 5; // Выполнено
    } else if (!task.deadline_ts) {
      index = 4; // Когда-нибудь
    } else if (task.deadline_ts >= afterTomorrow) {
      index = 3; // Скоро
    } else if (task.deadline_ts >= tomorrow) {
      index = 2; // Завтра
    } else if (task.deadline_ts >= today) {
      index = 1; // Сегодня
    } else if (!task.checked) {
      index = 0; // Просроченные
      expired = true;
    }
    if (index !== null) tasks[index].list.push({ id, expired });
  });

  return tasks;
};

/**
 *
 * @param count
 * @param day день с которого надо вернуть timestamp
 */
export const getDaysTimestamp = (count: number = 1, day = new Date()) => {
  const result: number[] = [];
  for (let i = 0; i < count; i++) {
    result.push(
      new Date(day.getFullYear(), day.getMonth(), day.getDate() + i).getTime()
    );
  }
  return result;
};

const filterTaskIds = (state: IRootState) => {
  const { search, taskIds, taskList } = state.task;

  const searchLowerCase = search.toLowerCase();


  return taskIds.filter(taskId => {
    const task = taskList[taskId];
    return searchLowerCase === '' || task.title.toLowerCase().indexOf(searchLowerCase) !== -1
  })
};
