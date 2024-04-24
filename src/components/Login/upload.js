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
  uploadFile = (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    this.setState({ fileData: data })

    data.append('file', file);
    // 向服务器发送Ajax请求，上传文件
    fetch('http://localhost:3007/api/upload', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ isUploading: false, result: data })
        this.props.onUpload(data.url)
      })
      .catch(err => console.error(err));
  };
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
        this.setState({ result: null })
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
          </>
        )}

      </div>
    );
  }
}

export default Upload
