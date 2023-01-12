
export default function itemsTable(selector, array){  

}

/**
 * 
 * @param {Item} project 
 * @returns 
 */
function tableRow(project){
    console.log(project.logo);
    const htmlStr = `
    <tr>
        <td>
            <a href="#">
                ${project.rid}
            </a>
        </td>
        <td>
            <img src="${project.logo ? project.logo : `https://avatars.dicebear.com/api/identicon/${project.rid}.svg`}" alt="Project logo" class="img-circle img-size-32 mr-2 shadow-sm">
            ${project.title}
        </td>
        <td>
            ${project.statusID ? projectStatusRepo.get(project.statusID).status : ``}
        </td>
        <td>
            ${project.createdDate ? new Date(project.createdDate).toLocaleDateString() : ``}
        </td>
        <td>
            <a href="${project.link != "" ? project.link : "#"}" class="text-muted" target="_blank">
            <i class="fas fa-globe ${project.link ? "text-success" : ""}"></i>
            </a>
        </td>
        </tr>
    `
    return htmlStr;
}