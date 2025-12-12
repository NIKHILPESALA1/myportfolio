'use client';

import { useEffect, useRef, useState } from 'react';

export default function ChatWidget({ webhookUrl = 'https://kundu.app.n8n.cloud/webhook/e1815ae6-b1a5-46b8-8050-09120ca85ed0/chat' }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let mounted = true;
    let cleanupFn = null;

    async function initChat() {
      if (!webhookUrl || webhookUrl.includes('YOUR-N8N-DOMAIN')) {
        setErrorMsg('Please set the webhookUrl to your real n8n webhook URL in ChatWidget props.');
        setStatus('error');
        return;
      }

      setStatus('loading');
      try {
        // load CSS via dynamic import so it only runs client-side
        await import('@n8n/chat/style.css').catch(() => {
          // fallback to CDN by injecting link if package CSS import fails
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/style.css';
          document.head.appendChild(link);
        });

        const mod = await import('@n8n/chat');
        if (!mod || typeof mod.createChat !== 'function') {
          throw new Error('createChat not found in @n8n/chat module');
        }

        // ensure target exists
        const targetId = '#n8n-chat-target';
        if (!containerRef.current) {
          throw new Error('chat container ref not found');
        }

        // call createChat
        mod.createChat({
          webhookUrl,
          target: targetId,
          mode: 'window', // or "fullscreen"
          // initialMessages: ['Hi! How can I help?'],
        });

        // some versions might provide a cleanup function — if so keep it
        cleanupFn = () => {
          // nothing specific to remove in current @n8n/chat public API,
          // but if the module provides a destroy/unmount function use it here.
        };

        if (mounted) setStatus('ready');
        console.log('n8n chat initialized (webhook):', webhookUrl);
      } catch (err) {
        console.error('Failed to initialize n8n chat:', err);
        if (mounted) {
          setErrorMsg(err.message || String(err));
          setStatus('error');
        }
      }
    }

    initChat();

    return () => {
      mounted = false;
      if (typeof cleanupFn === 'function') cleanupFn();
    };
  }, [webhookUrl]);

  return (
    <>
      <div ref={containerRef} id="n8n-chat-target" style={{ zIndex: 9999 }} />
      {status === 'loading' && <div style={{ position: 'fixed', right: 16, bottom: 16 }}>Loading chat…</div>}
      {status === 'error' && (
        <div style={{ position: 'fixed', right: 16, bottom: 16, background: '#fee', padding: 8, borderRadius: 6, border: '1px solid #f99', zIndex: 10000 }}>
          <strong>Chat failed:</strong>
          <div style={{ maxWidth: 300, wordBreak: 'break-word' }}>{errorMsg}</div>
          <div style={{ marginTop: 6 }}>
            <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>Retry</a>
          </div>
        </div>
      )}
    </>
  );
}
