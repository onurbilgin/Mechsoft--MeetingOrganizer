import React,{Component} from 'react';
import { hydrate } from 'react-dom';
import { variables } from './Variables.js';

export class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {
            meeting: [],
            modalTitle: "",
            meetingid:0,
            subject:"",
            date:"",
            start:"",
            end:"",
            participants:"",
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'meeting')
            .then(response => response.json())
            .then(data => {
                this.setState({ meeting: data });
            })
    }

    componentDidMount() {
        this.refreshList();
    }


    render(){
        const {
        meeting,
        modalTitle,
        subject,
        meetingid,
        date,
        start,
        end,
        participants
    } = this.state;

       
            return (
                
                <div>
                    <table className='table table-responsive-xl table-bordered table-striped table-hover '>
                        <thead>
                            <tr>
                                
                                <th>
                                    Toplantı Adı
                                </th>
                                <th>
                                    Tarih
                                </th>
                                <th>
                                    Başlangıç Zamanı
                                </th>
                                <th>
                                    Bitiş Zamanı
                                </th>
                                <th>
                                    Katılımcılar
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {meeting.map(meet =>
                                <tr key={meet.meetingid}>
                                    
                                    <td>{meet.subject}</td>
                                    <td>{meet.date}</td>
                                    <td>{meet.start}</td>
                                    <td>{meet.end}</td>
                                    <td>{meet.participants}</td>
                                    <td>
                                    
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
    }
}