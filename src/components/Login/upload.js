import React, { Component } from 'react'
import axios from 'axios'
import { Toast } from 'antd-mobile'

class Upload extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    progress: 0,   //上传进度
    isUploading: false, // 是否正在上传
    result: null  //上传结果数据
  };
  uploadFile = async (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    this.setState({ fileData: data })

    data.append('file', file);

    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.round((loaded * 100) / total);
        this.setState({ progress: percent });
      },
    }

    // 向服务器发送Ajax请求，上传文件
    try {
      axios.post('http://localhost:3007/api/upload',
        data,
        config)
        .then(res => {
          console.log(res.data, 'ttttttttttt')
          this.setState({ isUploading: false, result: res.data })
          this.props.onUpload(res.data.url)
        })
        .catch(err => console.error(err));;
    } catch (error) {
      console.error(error);
    }
  }
  deleuploadFile = (delurl) => {
    let url = "http://localhost:3007/api/deleUploadingimg"
    axios.post(url, { url: delurl }).then((res) => {
      console.log(res, 'ressss')
      if (res.data.code == 4001) {
        Toast.show({
          icon: 'fail',
          content: `${res.data.info}`,
        })
      } else if (res.data.code == 2001) {
        Toast.show('删除成功', 2);
        this.setState({ result: null, progress: 0 })
      }
    })
  }
  render() {
    const { result } = this.state;

    return (
      <div>
        {result ? (
          <div>
            <h3>上传结果</h3>
            <img style={{ width: '50px', height: '50px', borderRadius: 20 }} src={result.url} alt="上传结果" />
            <div onClick={() => { this.deleuploadFile(result.url) }}>再次上传</div>
          </div>
        ) : (
          <>
            <h2>头像上传</h2>
            <input type="file" id="file-input" onChange={this.uploadFile} />
            <progress value={this.state.progress} max="100" />
          </>
        )}

      </div>
    );
  }
}

export default Upload
