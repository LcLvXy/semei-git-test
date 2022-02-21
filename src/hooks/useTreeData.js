export default async function getTreeData(list) {
    const map = {};
    let threeData = [];
    list.forEach(item => {
        map[item.cid] = item
    });

    list.forEach((item) => {
        let parent = map[item.pid];
        if(parent) {
            if(!(parent.children instanceof Array)) {
                parent.children = new Array
            }
            parent.children.push(item);
        } else {
            threeData.push(item)
        }
    })
    return threeData;
}