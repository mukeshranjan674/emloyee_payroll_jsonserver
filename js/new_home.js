window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
                       "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    const innerHtml = `${headerHtml}
            <tr>
                <td><img src="../assets/profile-images/Ellipse -2.png" alt="" class="profile">
                </td>
                <td>Mukesh Ranjan</td>
                <td>Male</td>
                <td>
                    <div class="dept-label">HR</div>
                    <div class="dept-label">Finance</div>
                </td>
                <td>300000</td>
                <td>1 NOV 2020</td>
                <td>
                    <img id="1" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                    <img id="1" src="../assets/icons/create-black-18dp.svg" alt="edit">
                </td>
            </tr>
    `;
    document.querySelector('#display').innerHTML = innerHtml;
}