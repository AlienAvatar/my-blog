export const RepeatOnce = 1;
export const SortRepeat = 2;
export const Shuffle = 3;

export const columns = [
    {
        title: '歌曲',
        dataIndex: 'song',
    },
    {
        title: '歌手',
        dataIndex: 'singer',
    },
    {
        title: '时长',
        dataIndex: 'duration',
    },
    {
        dataIndex:'play'
    }
];

// Fisher-Yates Shuffle 算法，随机打乱数组
const shuffle = (array) => {
    let copy = [], n = array.length, i;

    // While there remain elements to shuffle…
    while (n) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * n--);

        // And move it to the new array.
        copy.push(array.splice(i, 1)[0]);
    }

    return copy;
};