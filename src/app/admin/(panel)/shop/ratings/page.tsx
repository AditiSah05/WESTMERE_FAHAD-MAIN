import { requireModule } from '@/lib/server/auth'
import VisitorRatingsView from '@/components/admin/ratings/VisitorRatingsView'
import {
  SEED_VISITOR_RATINGS,
  VISITOR_RATINGS_STATS,
  RATING_DISTRIBUTION,
  RATING_TRENDS,
  RATING_SENTIMENT,
  LATEST_FEEDBACK,
  INITIAL_WIDGET_SETTINGS,
  INITIAL_SUBMISSION_SETTINGS,
  MODERATION_SUMMARY,
  RECENT_ACTIVITY,
} from '@/lib/server/visitor-ratings'

export const metadata = { title: 'Visitor ratings' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  await requireModule('reviews')

  return (
    <VisitorRatingsView
      initialRatings={SEED_VISITOR_RATINGS}
      stats={VISITOR_RATINGS_STATS}
      distribution={RATING_DISTRIBUTION}
      trends={RATING_TRENDS}
      sentiment={RATING_SENTIMENT}
      feedback={LATEST_FEEDBACK}
      widgetSettings={INITIAL_WIDGET_SETTINGS}
      submissionSettings={INITIAL_SUBMISSION_SETTINGS}
      moderation={MODERATION_SUMMARY}
      activities={RECENT_ACTIVITY}
    />
  )
}
