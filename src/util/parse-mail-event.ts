class ParseMailEvent {
  private parseDateEvent(date:any) {
    const record = date.replace(/\n/g, '').split('       ')
    const fullDate = record[0]
    const local = record[1]

    return {
      fullDate,
      local
    }
  }

  public parseMailEvent(date: any, content: any) {
    const test = date.map(item => this.parseDateEvent(item))
    const final = content.map((item, index)=> {
      return {
        ...test[index],
        content: item
      }
    })

    return final
  }
}

export default ParseMailEvent