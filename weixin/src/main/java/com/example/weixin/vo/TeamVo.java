package com.example.weixin.vo;

import com.alibaba.fastjson.JSON;
import com.example.weixin.data.ContestMapper;
import com.example.weixin.data.TeamMapper;
import com.example.weixin.data.UserMapper;
import com.example.weixin.po.Team;

import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
public class TeamVo {
    private Integer id;
    private String pic;
    private String name;
    private String password;
    private String description;
    private UserVo captain;
    private ArrayList<UserVo> members;
    private String captainNotice;
    private ContestVo contest;
    private Integer maxNum;

    public TeamVo(){

    }
    public TeamVo(@NonNull  Team team,ContestMapper contestMapper,TeamMapper teamMapper,UserMapper userMapper){
        id=team.getId();
        pic=team.getPic();
        name=team.getName();
        password=team.getPassword();
        description=team.getDescription();
        captain=new UserVo(userMapper.getUserById(team.getCaptainId()));
        maxNum=team.getMaxNum();
        List<Integer> list=teamMapper.getMembers(team);
        if (list!=null){
            members=new ArrayList<UserVo>();
            for (int x:list){
                members.add(new UserVo(userMapper.getUserById(x)));
            }
        }
        captainNotice=team.getCaptainNotice();
        contest=new ContestVo(contestMapper.getContestById(team.getContestId()),userMapper,contestMapper);
    }
    public TeamVo(@NonNull TeamForm teamForm,UserMapper userMapper,ContestMapper contestMapper){
        name=teamForm.getName();
        captain=new UserVo(userMapper.getUserById(teamForm.getCaptainId()));
        contest=new ContestVo(contestMapper.getContestById(teamForm.getContestId()),userMapper,contestMapper);
        description=teamForm.getDescription();
        maxNum=teamForm.getMaxNum();
    }
}
