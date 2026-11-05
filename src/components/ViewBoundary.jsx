/**
 * Error boundary around the code-split case-study and résumé views. If a view
 * chunk fails to stream in (offline, stale cache after a deploy, hung request)
 * the whole app would otherwise unmount with a blank screen — this keeps the
 * failure contained and offers a way back.
 */

import { Component } from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './ViewSkeletons.module.css';

export default class ViewBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // Route chunks fail transiently (flaky networks); log for diagnostics but
    // keep the page usable.
    console.error('View failed to load:', error);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="container" style={{ paddingBlock: '4rem' }}>
          <div className={styles.asideCard} role="alert">
            <p style={{ margin: 0, color: 'var(--text)', fontWeight: 600 }}>
              This page didn&rsquo;t load.
            </p>
            <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '0.9rem' }}>
              The connection dropped while fetching this view. Check your network and try again.
            </p>
            <a
              className="btn btn-secondary"
              href="#home"
              onClick={() => this.setState({ failed: false })}
            >
              <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
              Back to portfolio
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
