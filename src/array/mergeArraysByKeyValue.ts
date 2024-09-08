export function mergeArraysByKeyValue<T extends { [key: string]: any }>(
  localArray: T[],
  remoteArray: T[],
  key: string,
  childrenKey?: keyof T,
): T[] {
  // 如果第一个数组为空，则直接返回空数组
  if (!localArray || localArray.length === 0)
    return []

  // 创建一个映射，用于存储remoteArray中项目的key值
  const remoteMap = new Map<string, T>()
  remoteArray.forEach((item) => {
    remoteMap.set(item[key], item)
  })

  const result: T[] = []

  // 遍历localArray，合并对象，并递归处理children数组
  localArray.forEach((localItem) => {
    const remoteItem = remoteMap.get(localItem[key])
    if (remoteItem) {
      // 合并本地和远程对象
      Object.assign(localItem, remoteItem)

      // 如果有children，递归合并children数组
      if (childrenKey && localItem[childrenKey] && remoteItem[childrenKey]) {
        Reflect.set(
          localItem,
          childrenKey,
          mergeArraysByKeyValue(
            localItem[childrenKey],
            remoteItem[childrenKey],
            key,
            childrenKey,
          ),
        )
      }

      // 从映射中删除已处理的远程项目
      remoteMap.delete(localItem[key])
    }
    result.push(localItem)
  })

  return result
}
