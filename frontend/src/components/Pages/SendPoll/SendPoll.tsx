import React from 'react';
import '../../../App.css';
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import {Checkbox, FormControl, ListItemText, OutlinedInput} from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";

interface SendPollState {
  data: Array<any>,
  loading: boolean,
  error: boolean,
  selected_poll_id:string,
  users:string[]
}
interface UserProps {
  user: string,
  chat_id: string
}
interface PollProps {
  poll_id: string,
  poll_name: string,
  unsent_users:UserProps[]
}

interface SelectPollProps {
    selected_poll_id: string;
    setSelectPoll: any;
    data: PollProps[];
}

const get_poll_name=function(poll_id:string, data:PollProps[]){
    data.forEach((poll: PollProps) => {
        if(poll.poll_id == poll_id){
            return poll.poll_name
        }
    })
}

const get_user_name=function(selected:string[], data:PollProps[], selected_poll_id:string){
    let names:string[] = []
    data.forEach((poll: PollProps) => {
        if(String(poll.poll_id) == selected_poll_id){
            selected.forEach((chat_id: string) => {
                poll.unsent_users.forEach((user:UserProps) =>{
                    if (user.chat_id==chat_id){
                        names.push(user.user);
                    }
                })
            })
            return names.join(',');
        }
    })
}

const SelectPoll: React.FC<SelectPollProps> = ({
                                                   selected_poll_id,
                                                   setSelectPoll,
                                                   data
                                               }) => {
    // @ts-ignore
    const onPollChange = (event) => {
        setSelectPoll(event.target.value)
    };

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Poll</InputLabel>
            <Select onChange={onPollChange}
                    value={selected_poll_id}
                    label="Poll"
            >
                {data.map((poll: PollProps) => (
                    <MenuItem key={poll.poll_id} value={poll.poll_id}>{poll.poll_name}</MenuItem>
                ))}
            </Select></FormControl>)
}

interface SelectUsersProps {
    selected_poll_id: string;
    users: string[];
    setUsers:any;
    data: PollProps[];
}

const SelectUsers: React.FC<SelectUsersProps> = ({
                              selected_poll_id,
                              users,
                              setUsers,
                              data
                          }) => {
    const get_users = (poll: PollProps, selected_poll_id:string) => {
    if(poll.poll_id == selected_poll_id){
        return (poll.unsent_users.map((user: UserProps) => (
            <MenuItem key={user.chat_id} value={user.user}>
                  <Checkbox checked={users.indexOf(user.user) > -1} />
                  <ListItemText primary={user.user} />
                </MenuItem>
                    )))
    }
    }
    const handleChange = (event: { target: { value: any; }; }) => {
        const {
            target: {value},
        } = event;
        // @ts-ignore
        setUsers(typeof value === 'string' ? value.split(',') : value);
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel >Receivers</InputLabel>
            <Select label="Receivers"
                    multiple
                    value={users}
                    onChange={handleChange}
                    input={<OutlinedInput label="Receivers" />}
                    renderValue={(selected) => selected.join(', ')}
                    // @ts-ignore
                    // renderValue={(selected) => {
                    //     return get_user_name(selected, data, selected_poll_id);
                    // }}
                    MenuProps={MenuProps}
            >
                {data.map((poll: PollProps) => (
                    get_users(poll, selected_poll_id)))
                }
            </Select>
        </FormControl>

    )
}



const useStyles = (theme: Theme) => createStyles({})
interface Props extends WithStyles<typeof useStyles> {token:string}

export interface MyPollsProps {
    token: string;
}


class SendPoll extends React.Component<Props,SendPollState> {
    state = {
          data: [],
          loading: true,
          error: false,
          selected_poll_id:"",
          users:[]
        };

    sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }


componentDidMount() {
    this.sleep(200)
      .then(r=>axios({
      method: "GET",
      url:"/api/polls_to_send",
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })  )
        .then(resp => resp.data)
        .then(resp => this.setState({
          data: resp,
          loading: false
        }))
        .catch(error => this.setState({
          loading: false,
          error: true
        }));
  }
render() {
    const {data} = this.state;
        return (
            <div className="SendPoll">
                <SelectPoll selected_poll_id={this.state.selected_poll_id} setSelectPoll={(selected_poll_id:string)=>{this.setState({
                    selected_poll_id: selected_poll_id})}} data={data}/>
                <SelectUsers selected_poll_id={this.state.selected_poll_id} setUsers={(newvalue:any[])=>{this.setState({
                    users: newvalue})}} users={this.state.users} data={data}/>
                <Button variant="contained"
                        component="label"
                        onClick={() => {
                        axios({
                          method: "POST",
                          url:"/api/send_poll",
                          headers: {
                            Authorization: 'Bearer ' + this.props.token
                          },
                              data:{'poll':this.state.selected_poll_id, 'users':this.state.users}
                        })
                                            }}
                        disabled={this.state.users.length===0}>
                    Submit
                </Button>
            </div>
        )
    }
}


export default withStyles(useStyles)(SendPoll)
