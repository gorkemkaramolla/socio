const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dateNow = new Date();
  const timeDifference = dateNow.getTime() - date.getTime();
  const seconds = timeDifference / 1000;
  const minutes = timeDifference / 1000 / 60;
  const hours = timeDifference / 1000 / 60 / 60;
  if (seconds < 60) {
    return seconds.toFixed() + ' second ago';
  } else if (minutes < 60) {
    return minutes.toFixed() + ' minute ago';
  } else if (hours >= 1 && hours < 24) {
    const plurality = Number(hours.toFixed()) > 1 ? ' hours ago' : ' hour ago';
    return hours.toFixed() + plurality;
  } else {
    const formattedDate = date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return formattedDate;
  }
};

export { formatDate };
