export default function TableRow(columnNumber, text="No records found..."){
    const htmlStr = 
    `
    <tr>
        <td colspan="${columnNumber}" class="text-center">
            ${text}
        </td>
    </tr>
    `
}