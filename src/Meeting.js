import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Meeting extends Component {

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

    changesubject = (e) => {
        this.setState({ subject: e.target.value });
    }

    changedate = (e) => {
        this.setState({ date: e.target.value });
    }

    changestart = (e) => {
        this.setState({ start: e.target.value });
    }

    changeend = (e) => {
        this.setState({ end: e.target.value });
    }

    changeparticipants = (e) => {
        this.setState({ participants: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Toplantı Oluştur",
            meetingid: 0,
            subject: "",
            date:"",
            start:"",
            end:"",
            participants:"",    
        });
    }

    editClick(meet) {
        this.setState({
            modalTitle: "Toplantı Düzenle",
            meetingid: meet.meetingid,
            subject: meet.subject,
            date: meet.date,
            start: meet.start,
            end: meet.end,
            participants: meet.participants
        });
    }

    createClick(){
        fetch(variables.API_URL+'meeting',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                subject:this.state.subject,
                date:this.state.date,
                start:this.state.start,
                end:this.state.end,
                participants:this.state.participants
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Hata!');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'meeting',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                meetingid:this.state.meetingid,
                subject:this.state.subject,
                date:this.state.date,
                start:this.state.start,
                end:this.state.end,
                participants:this.state.participants
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Hata!');
        })
    }

    deleteClick(id){
        if(window.confirm('Silmek istediğinize emin misiniz?')){
        fetch(variables.API_URL+'meeting/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Hata!');
        })
        }
    }

    render() {
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
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Toplantı Oluştur
                </button>
                <table className='table table-responsive-xl table-bordered table-striped table-hover'>
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
                            <th>
                                Düzenle
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
                                <button type='button'
                                    className='btn btn-light mr-1'
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => this.editClick(meet)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>

                                <button type='button'
                                    className='btn btn-light mr-1'
                                        onClick={()=>this.deleteClick(meet.meetingid)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center">
                                <h5 className="modal-title ">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Toplantı Konusu</span>
                                    <input type="text" className="form-control"
                                        value={subject}
                                        onChange={this.changesubject} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Tarih</span>
                                    <input type="date" className="form-control"
                                        value={date}
                                        onChange={this.changedate} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Başlangıç Zamanı</span>
                                    <input type="time" className="form-control"
                                        value={start}
                                        onChange={this.changestart} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Bitiş Zamanı</span>
                                    <input type="time" className="form-control"
                                        value={end}
                                        onChange={this.changeend} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Katılımcılar</span>
                                    <input type="text" className="form-control"
                                        value={participants}
                                        onChange={this.changeparticipants} />
                                </div>

                                {meetingid == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Oluştur</button>
                                    : null}

                                {meetingid != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Güncelle</button>
                                    : null}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}