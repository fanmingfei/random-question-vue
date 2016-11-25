const fs = require('fs');
fs.readFile('./a.txt', (err, data) => {
    if (err) throw err;


    var a = data.toString();

    // var b = a.match(/\d+.+\n.+\n?/);
    var arr = a.split(/\n\n/);

    var judge = [];
    var singleSelect = []
    var multiSelect = []
    var i = 0;

    arr.forEach(function(item) {
        var tmp = item.split('\n');
        var ans = tmp[0].match(/（(\w+)）/);

        if (!ans) {

            if (item.indexOf('\n') > -1) {
                console.log('----' + item + '-----');
            }

            return;
        }

        if (tmp.length > 4) {
            var title = {
                aid: tmp[0].split('.')[0],
                title: tmp[0].split('.').slice(1).join('').replace(/（(\w+)）/, ''),
                A: tmp[1],
                B: tmp[2],
                C: tmp[3],
                D: tmp[4],
                ans: ans[1]
            }
            if (ans[1].length > 1) {
                title.type = '多项选择题'
                multiSelect.push(title)
            } else {
                title.type = '单项选择题'
                singleSelect.push(title)
            }
        }
        if (tmp.length > 0 && tmp.length < 5) {

            judge.push({
                aid: tmp[0].split('.')[0],
                title: tmp[0].split('.').slice(1).join('').replace(/（(\w+)）/, ''),
                ans: ans[1],
                type: '判断题'
            })
        }

    })
    console.log(judge.length)
    console.log(multiSelect.length)
    console.log(singleSelect.length)
    console.log(singleSelect.length + judge.length + multiSelect.length)

    var json = {
        judge: judge,
        multiSelect: multiSelect,
        singleSelect: singleSelect
    }

    var string = JSON.stringify(json);
    fs.writeFile('questions.js', 'var questions = ' + string);

});
