<?php

namespace SilverStripe\AssetAdmin\Model;

use Embed\Adapters\Adapter;
use Embed\Embed;
use Embed\Http\DispatcherInterface;
use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Core\Manifest\ModuleResourceLoader;

/**
 * Encapsulation of an embed tag, linking to an external media source.
 *
 * @see Embed
 */
class EmbedResource
{
    use Injectable;

    /**
     * Embed result
     *
     * @var Adapter
     */
    protected $embed;

    /**
     * @param string $url
     */
    public function __construct($url)
    {
        $dispatcher = null;
        if (Injector::inst()->has(DispatcherInterface::class)) {
            $dispatcher = Injector::inst()->get(DispatcherInterface::class);
        }
        $this->embed = Embed::create($url, null, $dispatcher);
    }

    /**
     * Get width of this Embed
     *
     * @return int
     */
    public function getWidth()
    {
        return $this->embed->getWidth() ?: 100;
    }

    /**
     * Get height of this Embed
     *
     * @return int
     */
    public function getHeight()
    {
        return $this->embed->getHeight() ?: 100;
    }

    public function getPreviewURL()
    {
        // Use thumbnail url
        if ($this->embed->image) {
            return $this->embed->image;
        }

        // Use direct image type
        if ($this->getType() === 'photo' && !empty($this->embed->url)) {
            return $this->embed->url;
        }

        // Default media
        return ModuleResourceLoader::resourceURL(
            'silverstripe/asset-admin:client/dist/images/icon_file.png'
        );
    }

    /**
     * Get human readable name for this resource
     *
     * @return string
     */
    public function getName()
    {
        if ($this->embed->title) {
            return $this->embed->title;
        }

        return preg_replace('/\?.*/', '', basename($this->embed->getUrl()));
    }

    /**
     * Get Embed type
     *
     * @return string
     */
    public function getType()
    {
        return $this->embed->type;
    }
}
