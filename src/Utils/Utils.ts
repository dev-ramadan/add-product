export function descSeeMore (text:string,max:number=19){
     const tex = text.split(" ").filter(word => word.lastIndexOf(`${max}`))
     const finaltext = tex.splice(0,max).join(' ')
     return `${finaltext}...`
}