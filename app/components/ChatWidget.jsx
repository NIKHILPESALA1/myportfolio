'use client';

import { useEffect, useRef, useState } from 'react';

export default function ChatWidget({
  webhookUrl = 'https://kundu.app.n8n.cloud/webhook/e1815ae6-b1a5-46b8-8050-09120ca85ed0/chat',
}) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let mounted = true;
    let cleanup = null;

    async function init() {
      setStatus('loading');

      try {
        // Load CSS (try package, fallback to CDN)
        try {
          await import('@n8n/chat/style.css');
        } catch (e) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/style.css';
          document.head.appendChild(link);
        }

        // dynamic import of package
        const mod = await import('@n8n/chat').catch((err) => {
          throw new Error('@n8n/chat import failed: ' + err.message);
        });

        if (!mod || typeof mod.createChat !== 'function') {
          throw new Error('createChat not found in @n8n/chat');
        }

        // ensure target element exists
        const targetId = '#n8n-chat-target';
        if (!containerRef.current) throw new Error('Chat container not mounted');

        // call createChat using your chat endpoint
        mod.createChat({
          webhookUrl,
          target: targetId,
          mode: 'window',
        });

        // No official destroy API currently; keep placeholder cleanup
        cleanup = () => {
          // if the lib exposes unmount/destroy in future, call it here
        };

        if (mounted) {
          setStatus('ready');
          console.log('n8n chat initialized ->', webhookUrl);
        }
      } catch (err) {
        console.error('n8n chat init error:', err);
        if (mounted) {
          setErrorMsg(err.message || String(err));
          setStatus('error');
        }
      }
    }

    init();

    return () => {
      mounted = false;
      if (typeof cleanup === 'function') cleanup();
    };
  }, [webhookUrl]);

  return (
    <>
      <div ref={containerRef} id="n8n-chat-target" style={{ zIndex: 9999 }} />
      {status === 'loading' && (
        <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 10001 }}>Loading chat…</div>
      )}
      {status === 'error' && (
        <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 10001, background: '#fee', padding: 8, borderRadius: 6, border: '1px solid #f99' }}>
          <strong>Chat failed:</strong>
          <div style={{ maxWidth: 300, wordBreak: 'break-word' }}>{errorMsg}</div>
        </div>
      )}
    </>
  );
}
