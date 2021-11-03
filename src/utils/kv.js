  // method for getting all keys => return array[int]
  const allKeys = async () => {
    const keys = [];
    const kvs = await MY_KV.list();
    for (let k of kvs['keys']) {
      keys.push(k['name'])
    }
    return keys;
  }
  
  // method for getting all title's => return array[string]
  // implement no dup titles in future
  const allTitles = async () => {
    const titles = [];
    const kvs = await MY_KV.list();
    for (let k of kvs['keys']){
      let data = await MY_KV.get(k['name'])
      titles.push((JSON.parse(data)['title']))
    }
    return titles;
  }

export {allKeys}