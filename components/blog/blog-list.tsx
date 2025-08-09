'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Heart } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Gentle Coastal Escapes for a Calm Mind',
    excerpt: 'Discover serene beach destinations perfect for healing your soul and finding inner peace. From hidden coves to therapeutic spa resorts, these coastal retreats offer the emotional sanctuary you need.',
    content: `When life feels overwhelming, there's something profoundly healing about the rhythm of ocean waves. The sound, the salt air, the endless horizon – coastal destinations have a unique power to calm our anxious minds and restore our emotional balance.

## The Science of Ocean Therapy

Research shows that being near water reduces cortisol levels and activates the parasympathetic nervous system. The negative ions produced by crashing waves can boost serotonin levels, naturally improving mood and reducing anxiety.

## Top Healing Coastal Destinations

### 1. The Maldives - Ultimate Serenity
- **Emotional Benefit**: Complete disconnection from stress
- **Best For**: Severe burnout, relationship healing
- **Experience**: Overwater bungalows, meditation on private beaches, sunset yoga

### 2. Big Sur, California - Rugged Beauty for Deep Reflection  
- **Emotional Benefit**: Perspective and clarity
- **Best For**: Life transitions, creative blocks
- **Experience**: Clifftop meditation, forest bathing, hot springs

### 3. Santorini, Greece - Romance with Yourself
- **Emotional Benefit**: Self-love and appreciation
- **Best For**: Building confidence, celebrating personal growth
- **Experience**: Sunset watching, wine tasting, photography walks

## Creating Your Coastal Healing Ritual

**Morning Practice**: Start each day with a beach walk at sunrise
**Midday Rest**: Find shade and practice deep breathing with ocean sounds
**Evening Reflection**: Journal while watching the sunset

Remember, the goal isn't just relaxation – it's emotional reset and renewal. Let the ocean wash away what no longer serves you.`,
    author: 'Dr. Elena Martinez',
    authorRole: 'Emotional Wellness Travel Expert',
    publishedAt: '2024-01-15',
    readTime: '8 min',
    category: 'Wellness Travel',
    mood: 'Calm',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Ocean Therapy', 'Mental Health', 'Stress Relief', 'Mindfulness'],
  },
  {
    id: 2,
    title: 'Adventures That Heal: Travel Therapy for the Heartbroken',
    excerpt: 'Sometimes the best way to mend a broken heart is to step outside your comfort zone. Discover how adventure travel can transform pain into strength, loneliness into self-discovery.',
    content: `Heartbreak is one of life's most challenging emotional experiences. While there's no magic cure, adventure travel offers a unique form of therapy that can help transform your pain into personal power.

## Why Adventure Heals Emotional Pain

Adventure travel forces us out of our comfort zones and into the present moment. When you're focused on navigating a mountain trail or learning to surf, your mind gets a break from ruminating on loss.

### The Psychology Behind It
- **Flow State**: Challenging activities create flow, where self-consciousness disappears
- **Accomplishment**: Overcoming physical challenges rebuilds confidence
- **New Neural Pathways**: Novel experiences literally rewire your brain
- **Community**: Adventure often involves meeting like-minded people

## Healing Adventures by Heartbreak Type

### Recent Breakup (0-3 months)
**Recommended**: Solo hiking, photography tours, cooking classes abroad
**Why**: Gentle challenges that rebuild self-identity
**Destinations**: New Zealand solo hiking, Tuscany cooking retreats, Iceland photography

### Divorce Recovery (3-12 months)
**Recommended**: Adventure group tours, learning new skills
**Why**: Structured support with built-in community  
**Destinations**: Patagonia trekking groups, Bali surf camps, Nepal yoga treks

### Long-term Healing (1+ years)
**Recommended**: Expedition-style adventures, volunteer travel
**Why**: Major challenges that prove your resilience
**Destinations**: Everest Base Camp, Amazon volunteering, African safari

## Your Healing Adventure Checklist

Before You Go:
- Set an intention beyond "getting over" someone
- Choose challenges that excite rather than terrify you
- Pack a journal for processing emotions
- Consider telling your story to fellow travelers

During Your Trip:
- Say yes to spontaneous opportunities  
- Document your strength, not just scenery
- Allow yourself to feel emotions as they arise
- Celebrate every small victory

After You Return:
- Create a photo book of your growth
- Maintain connections made during travel
- Plan your next adventure with confidence

Remember: You're not running away from your pain – you're running toward your strength.`,
    author: 'Marcus Chen',
    authorRole: 'Adventure Psychology Specialist',
    publishedAt: '2024-01-12',
    readTime: '12 min',
    category: 'Adventure Therapy',
    mood: 'Adventurous',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Heartbreak Recovery', 'Adventure Therapy', 'Solo Travel', 'Personal Growth'],
  },
  {
    id: 3,
    title: 'Cultural Immersion: Finding Yourself in Foreign Lands',
    excerpt: 'When you feel lost or disconnected from who you are, cultural immersion travel can provide profound insights and help you rediscover your authentic self through meaningful connections.',
    content: `In our interconnected yet often isolating modern world, many of us struggle with questions of identity and belonging. Cultural immersion travel offers a unique mirror – by experiencing how others live, we often discover who we truly are.

## The Mirror Effect of Cultural Travel

When we step into a completely different culture, we're forced to examine our own assumptions, values, and behaviors. This external perspective can illuminate aspects of ourselves we've never noticed.

### What Cultural Immersion Really Means
- **Language Learning**: Attempting local languages, even poorly, shows respect and opens doors
- **Living Like Locals**: Staying in homestays, using public transport, shopping at local markets
- **Ritual Participation**: Joining cultural ceremonies, religious services, or community events
- **Story Sharing**: Exchanging life stories with local people over shared meals

## Transformative Cultural Destinations

### Japan - The Art of Mindful Living
**What You'll Discover About Yourself**: Your relationship with time, perfection, and respect
**Experiences**: 
- Tea ceremony meditation
- Staying in traditional ryokans
- Learning calligraphy or origami
- Participating in local festivals

**Personal Growth**: Understanding the beauty of imperfection (wabi-sabi) and the importance of presence

### India - Spiritual Awakening Through Chaos  
**What You'll Discover About Yourself**: Your resilience, compassion, and spiritual capacity
**Experiences**:
- Ashram stays and meditation retreats  
- Volunteering with local NGOs
- Participating in religious festivals
- Learning about Ayurvedic healing

**Personal Growth**: Developing patience, finding peace within chaos, understanding interconnectedness

### Morocco - Navigating Community and Tradition
**What You'll Discover About Yourself**: Your comfort with ambiguity and appreciation for craftsmanship  
**Experiences**:
- Staying with Berber families in the Atlas Mountains
- Learning traditional crafts in Fez
- Sharing meals and stories in riads
- Desert camping and star gazing

**Personal Growth**: Appreciating the value of community, slowing down, and hands-on creation

## Your Cultural Immersion Journey

### Before You Go
1. **Study the History**: Understanding context enriches every interaction
2. **Learn Basic Phrases**: Even simple greetings show respect and effort
3. **Prepare for Discomfort**: Cultural shock is normal and often where growth happens
4. **Set Intentions**: What aspects of yourself do you want to explore?

### During Your Stay  
1. **Say Yes More Than No**: Accept invitations, try unfamiliar foods, join activities
2. **Ask Questions with Genuine Curiosity**: People love sharing their culture with respectful visitors
3. **Document Internal Changes**: Journal about what surprises, challenges, or inspires you
4. **Practice Patience**: Both with others and yourself as you navigate differences

### Integration Back Home
1. **Maintain Connections**: Keep in touch with people you met
2. **Incorporate Lessons**: Adopt practices that resonated with you  
3. **Share Stories**: Help others understand the culture you experienced
4. **Plan Return Visits**: Deep cultural understanding takes multiple trips

## The Gifts You'll Return With

Cultural immersion doesn't just teach you about other places – it teaches you about your own capacity for adaptation, empathy, and growth. You'll return home with:

- **Expanded Perspective**: Problems that once seemed huge may feel more manageable
- **Increased Confidence**: Navigating foreign cultures proves your resourcefulness
- **Deeper Gratitude**: Experiencing different lifestyles often increases appreciation for what you have
- **Authentic Connections**: Relationships formed across cultural boundaries are often profound
- **Clearer Identity**: Understanding who you are when everything familiar is stripped away

Remember: The goal isn't to become someone else – it's to become more fully yourself.`,
    author: 'Priya Sharma',
    authorRole: 'Cultural Anthropologist & Travel Writer',
    publishedAt: '2024-01-08',
    readTime: '15 min',
    category: 'Cultural Travel',
    mood: 'Confused',
    image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Cultural Immersion', 'Self Discovery', 'Identity', 'Mindful Travel'],
  },
];

export function BlogList() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold arca-text-gradient mb-6">
          The ARCA Journal
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stories, insights, and guidance for emotionally intelligent travelers seeking deeper connections with themselves and the world.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {blogPosts.map((post, index) => (
          <Card key={post.id} className={`overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white border-0 ${index === 0 ? 'lg:col-span-2' : ''}`}>
            <div className={`grid ${index === 0 ? 'md:grid-cols-2 gap-0' : 'grid-cols-1'}`}>
              {/* Image */}
              <div className={`${index === 0 ? 'h-80 md:h-auto' : 'h-64'} overflow-hidden relative`}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`
                    ${post.mood === 'Calm' ? 'bg-green-500' : ''}
                    ${post.mood === 'Adventurous' ? 'bg-orange-500' : ''}  
                    ${post.mood === 'Confused' ? 'bg-purple-500' : ''}
                    text-white font-medium
                  `}>
                    {post.mood} Mood
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className={`p-8 ${index === 0 ? 'flex flex-col justify-center' : ''}`}>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                <h2 className={`font-display font-bold mb-4 text-gray-800 leading-tight ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                  {post.title}
                </h2>

                <p className={`text-gray-600 mb-6 leading-relaxed ${index === 0 ? 'text-lg' : ''}`}>
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.authorRole}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="arca-gradient text-white w-fit">
                  <Link href={`/blog/${post.id}`}>
                    Read Full Article
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Newsletter Signup */}
      <Card className="mt-16 p-8 md:p-12 text-center bg-gradient-to-r from-arca-teal to-arca-coral text-white">
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
          Get Weekly Emotional Travel Insights
        </h3>
        <p className="text-lg mb-6 text-white/90">
          Join 10,000+ mindful travelers receiving weekly stories and tips for emotionally intelligent exploration.
        </p>
        <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800 text-lg"
          />
          <Button className="bg-white text-arca-teal hover:bg-gray-100">
            Subscribe
          </Button>
        </div>
      </Card>
    </div>
  );
}