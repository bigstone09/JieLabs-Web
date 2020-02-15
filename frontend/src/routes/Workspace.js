import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from '../comps/Icon';

import { submitBuild, connectToBoard, programBitstream } from '../store/actions';

import Monaco from 'react-monaco-editor';
import Sandbox from '../Sandbox';

export default React.memo(() => {
  const [code, setCode] = useState('');

  const dispatch = useDispatch();
  // TODO: disable button when polling
  const isPolling = useSelector(store => store.build.isPolling);
  const doUpload = useCallback(async () => {
    if (!isPolling) {
      await dispatch(submitBuild(code));
    }
  }, [code, dispatch, isPolling]);

  const hasBoard = useSelector(store => store.board.hasBoard);
  const doConnect = useCallback(async () => {
    if (!hasBoard) {
      await dispatch(connectToBoard());
    }
  }, [dispatch, hasBoard]);

  const hasBitstream = useSelector(store => store.build.buildInfo && store.build.buildInfo.status === "Compilation Success");
  const doProgram = useCallback(async () => {
    if (hasBoard && hasBitstream) {
      await dispatch(programBitstream());
    }
  }, [dispatch, hasBitstream, hasBoard]);

  return <main className="workspace">
    <div className="left">
      <Sandbox />
    </div>
    <div className="toolbar">
      <button className="primary" onClick={doUpload}>
        <Icon>play_arrow</Icon>
      </button>

      <button className="secondary" onClick={doConnect}>
        <Icon>developer_board</Icon>
      </button>

      <button className="secondary" onClick={doProgram}>
        <Icon>cloud_download</Icon>
      </button>

      <button>
        <Icon>help_outline</Icon>
      </button>
    </div>
    <div className="right">
      <Monaco
        options={{
          theme: 'vs-dark',
          language: 'vhdl',
        }}
        onChange={setCode}
      />
    </div>
  </main>;
});
